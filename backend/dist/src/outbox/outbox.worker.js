"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OutboxWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxWorker = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const outbox_service_1 = require("./outbox.service");
let OutboxWorker = OutboxWorker_1 = class OutboxWorker {
    prisma;
    outboxService;
    logger = new common_1.Logger(OutboxWorker_1.name);
    POLLING_INTERVAL_MS = 5000;
    MAX_RETRY_COUNT = 3;
    intervalId = null;
    isRunning = false;
    constructor(prisma, outboxService) {
        this.prisma = prisma;
        this.outboxService = outboxService;
    }
    async onModuleInit() {
        this.logger.log('Outboxワーカーを起動します...');
        this.start();
    }
    async onModuleDestroy() {
        this.logger.log('Outboxワーカーを停止します...');
        this.stop();
    }
    start() {
        if (this.isRunning) {
            this.logger.warn('ワーカーは既に実行中です');
            return;
        }
        this.isRunning = true;
        this.logger.log(`ワーカーを開始しました（ポーリング間隔: ${this.POLLING_INTERVAL_MS}ms）`);
        this.processTasks();
        this.intervalId = setInterval(() => {
            this.processTasks();
        }, this.POLLING_INTERVAL_MS);
    }
    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.logger.log('ワーカーを停止しました');
    }
    async resetTimeoutTasks() {
        try {
            await this.outboxService.resetTimeoutTasks();
        }
        catch (error) {
            this.logger.error(`タイムアウトタスクのリセットに失敗: ${error.message}`);
        }
    }
    async processTasks() {
        try {
            await this.resetTimeoutTasks();
            const tasks = await this.prisma.$queryRaw `
        SELECT id, type, payload, status, "retryCount"
        FROM outbox
        WHERE status = 'pending'
        ORDER BY "createdAt" ASC
        LIMIT 10
        FOR UPDATE SKIP LOCKED
      `;
            if (tasks.length === 0) {
                return;
            }
            this.logger.log(`${tasks.length}件のタスクを取得しました`);
            for (const task of tasks) {
                await this.processTask(task);
            }
        }
        catch (error) {
            this.logger.error(`タスク処理中にエラーが発生: ${error.message}`, error.stack);
        }
    }
    async processTask(task) {
        const startTime = Date.now();
        try {
            await this.prisma.outbox.update({
                where: { id: task.id },
                data: {
                    status: 'processing',
                    updatedAt: new Date(),
                },
            });
            this.logger.log(`タスク処理開始: ${task.id} (type: ${task.type})`);
            if (task.type === 'article_processing') {
                await this.processArticleTask(task.payload);
            }
            else {
                throw new Error(`未知のタスクタイプ: ${task.type}`);
            }
            const duration = Date.now() - startTime;
            await this.prisma.outbox.update({
                where: { id: task.id },
                data: {
                    status: 'done',
                    processedAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            this.logger.log(`タスク処理完了: ${task.id} (${duration}ms)`);
        }
        catch (error) {
            const duration = Date.now() - startTime;
            const errorMessage = error instanceof Error ? error.message : '不明なエラー';
            const shouldRetry = task.retryCount < this.MAX_RETRY_COUNT;
            await this.prisma.outbox.update({
                where: { id: task.id },
                data: {
                    status: shouldRetry ? 'pending' : 'failed',
                    error: errorMessage,
                    retryCount: task.retryCount + 1,
                    updatedAt: new Date(),
                },
            });
            if (shouldRetry) {
                this.logger.warn(`タスク処理失敗（リトライ可能）: ${task.id} - ${errorMessage} (${duration}ms)`);
            }
            else {
                this.logger.error(`タスク処理失敗（リトライ上限到達）: ${task.id} - ${errorMessage} (${duration}ms)`);
            }
        }
    }
    async processArticleTask(payload) {
        const titleLength = payload.title.length;
        this.logger.log(`記事処理: ${payload.articleId} - タイトル文字数: ${titleLength}`);
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
};
exports.OutboxWorker = OutboxWorker;
exports.OutboxWorker = OutboxWorker = OutboxWorker_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        outbox_service_1.OutboxService])
], OutboxWorker);
//# sourceMappingURL=outbox.worker.js.map