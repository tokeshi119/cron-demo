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
var JobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fetch_service_1 = require("../fetch/fetch.service");
let JobsService = JobsService_1 = class JobsService {
    prisma;
    fetchService;
    logger = new common_1.Logger(JobsService_1.name);
    MAX_RETRY_COUNT = 3;
    constructor(prisma, fetchService) {
        this.prisma = prisma;
        this.fetchService = fetchService;
    }
    async getJobs(params = {}) {
        const page = params.page ?? 1;
        const limit = params.limit ?? 50;
        const skip = (page - 1) * limit;
        const where = {};
        if (params.sourceId) {
            where.sourceId = params.sourceId;
        }
        if (params.status) {
            where.status = params.status;
        }
        const [jobs, total] = await Promise.all([
            this.prisma.fetchJob.findMany({
                where,
                include: {
                    source: {
                        select: {
                            id: true,
                            name: true,
                            url: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.fetchJob.count({ where }),
        ]);
        const allJobs = await this.prisma.fetchJob.findMany({
            where: params.sourceId ? { sourceId: params.sourceId } : undefined,
            select: {
                status: true,
                duration: true,
            },
        });
        const successCount = allJobs.filter((j) => j.status === 'success').length;
        const failedCount = allJobs.filter((j) => j.status === 'failed').length;
        const successfulDurations = allJobs
            .filter((j) => j.status === 'success' && j.duration !== null)
            .map((j) => j.duration);
        const averageDuration = successfulDurations.length > 0
            ? successfulDurations.reduce((a, b) => a + b, 0) /
                successfulDurations.length
            : null;
        return {
            jobs: jobs.map((job) => ({
                id: job.id,
                sourceId: job.sourceId,
                source: job.source,
                status: job.status,
                error: job.error,
                duration: job.duration,
                articleCount: job.articleCount,
                createdAt: job.createdAt.toISOString(),
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            statistics: {
                totalJobs: allJobs.length,
                successCount,
                failedCount,
                averageDuration: averageDuration ? Math.round(averageDuration) : null,
            },
        };
    }
    async getJobById(id) {
        const job = await this.prisma.fetchJob.findUnique({
            where: { id },
            include: {
                source: {
                    select: {
                        id: true,
                        name: true,
                        url: true,
                    },
                },
            },
        });
        if (!job) {
            return null;
        }
        return {
            id: job.id,
            sourceId: job.sourceId,
            source: job.source,
            status: job.status,
            error: job.error,
            duration: job.duration,
            articleCount: job.articleCount,
            createdAt: job.createdAt.toISOString(),
        };
    }
    async retryJob(jobId) {
        const job = await this.prisma.fetchJob.findUnique({
            where: { id: jobId },
            include: {
                source: true,
            },
        });
        if (!job) {
            throw new common_1.NotFoundException(`ID ${jobId} のジョブが見つかりません`);
        }
        if (job.status === 'success') {
            throw new common_1.BadRequestException('成功したジョブはリトライできません。失敗したジョブのみリトライ可能です。');
        }
        const failedJobsCount = await this.prisma.fetchJob.count({
            where: {
                sourceId: job.sourceId,
                status: 'failed',
                createdAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
        });
        if (failedJobsCount >= this.MAX_RETRY_COUNT) {
            throw new common_1.BadRequestException(`リトライ上限（${this.MAX_RETRY_COUNT}回）に達しています。時間をおいて再度お試しください。`);
        }
        if (!job.source.enabled) {
            throw new common_1.BadRequestException(`ソース "${job.source.name}" が無効になっているため、リトライできません。`);
        }
        this.logger.log(`ジョブリトライ開始: ${job.source.name} (ジョブID: ${jobId})`);
        try {
            const result = await this.fetchService.fetchFeed(job.sourceId);
            this.logger.log(`ジョブリトライ成功: ${job.source.name} - ${result.articleCount}件の記事を取得`);
            return {
                success: true,
                message: `リトライに成功しました。${result.articleCount}件の記事を取得しました。`,
                articleCount: result.articleCount,
                duration: result.duration,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : '不明なエラー';
            this.logger.error(`ジョブリトライ失敗: ${job.source.name} - ${errorMessage}`, error instanceof Error ? error.stack : undefined);
            throw new common_1.BadRequestException(`リトライに失敗しました: ${errorMessage}`);
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = JobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fetch_service_1.FetchService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map