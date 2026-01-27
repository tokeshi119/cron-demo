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
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const fetch_service_1 = require("../fetch/fetch.service");
let CronService = CronService_1 = class CronService {
    prisma;
    fetchService;
    logger = new common_1.Logger(CronService_1.name);
    runningJobs = new Set();
    constructor(prisma, fetchService) {
        this.prisma = prisma;
        this.fetchService = fetchService;
    }
    async handleCron() {
        this.logger.log('Cronジョブ開始: 有効なソースのRSS取得');
        try {
            const enabledSources = await this.prisma.source.findMany({
                where: { enabled: true },
            });
            if (enabledSources.length === 0) {
                this.logger.log('有効なソースがありません');
                return;
            }
            this.logger.log(`${enabledSources.length}件のソースを取得します`);
            const fetchPromises = enabledSources.map((source) => this.fetchSourceSafely(source.id, source.name));
            await Promise.allSettled(fetchPromises);
            this.logger.log('Cronジョブ完了');
        }
        catch (error) {
            this.logger.error(`Cronジョブでエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`, error instanceof Error ? error.stack : undefined);
        }
    }
    async fetchSourceSafely(sourceId, sourceName) {
        if (this.runningJobs.has(sourceId)) {
            this.logger.warn(`ソース "${sourceName}" (${sourceId}) は既に実行中のためスキップします`);
            return;
        }
        this.runningJobs.add(sourceId);
        try {
            await this.fetchService.fetchFeed(sourceId);
        }
        catch (error) {
            this.logger.error(`ソース "${sourceName}" (${sourceId}) の取得に失敗: ${error instanceof Error ? error.message : '不明なエラー'}`);
        }
        finally {
            this.runningJobs.delete(sourceId);
        }
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCron", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fetch_service_1.FetchService])
], CronService);
//# sourceMappingURL=cron.service.js.map