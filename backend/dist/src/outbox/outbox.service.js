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
var OutboxService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OutboxService = OutboxService_1 = class OutboxService {
    prisma;
    logger = new common_1.Logger(OutboxService_1.name);
    MAX_RETRY_COUNT = 3;
    PROCESSING_TIMEOUT_MS = 10 * 60 * 1000;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(status) {
        const where = {};
        if (status) {
            where.status = status;
        }
        return this.prisma.outbox.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            take: 100,
        });
    }
    async findOne(id) {
        const task = await this.prisma.outbox.findUnique({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`ID ${id} のOutboxタスクが見つかりません`);
        }
        return task;
    }
    async retry(id) {
        const task = await this.findOne(id);
        if (task.status !== 'failed') {
            throw new Error(`リトライできるのは失敗したタスクのみです（現在のステータス: ${task.status}）`);
        }
        if (task.retryCount >= this.MAX_RETRY_COUNT) {
            throw new Error(`リトライ上限（${this.MAX_RETRY_COUNT}回）に達しています`);
        }
        return this.prisma.outbox.update({
            where: { id },
            data: {
                status: 'pending',
                error: null,
                updatedAt: new Date(),
            },
        });
    }
    async resetTimeoutTasks() {
        const timeoutThreshold = new Date(Date.now() - this.PROCESSING_TIMEOUT_MS);
        const result = await this.prisma.outbox.updateMany({
            where: {
                status: 'processing',
                updatedAt: {
                    lt: timeoutThreshold,
                },
            },
            data: {
                status: 'pending',
                error: 'タイムアウトによりリセットされました',
            },
        });
        if (result.count > 0) {
            this.logger.warn(`${result.count}件のタイムアウトタスクをリセットしました`);
        }
        return result.count;
    }
};
exports.OutboxService = OutboxService;
exports.OutboxService = OutboxService = OutboxService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OutboxService);
//# sourceMappingURL=outbox.service.js.map