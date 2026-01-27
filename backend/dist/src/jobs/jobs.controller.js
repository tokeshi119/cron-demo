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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("./jobs.service");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async getJobs(sourceId, status, page, limit) {
        return this.jobsService.getJobs({
            sourceId,
            status,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
    }
    async getJobById(id) {
        const job = await this.jobsService.getJobById(id);
        if (!job) {
            throw new common_1.NotFoundException(`ID ${id} のジョブが見つかりません`);
        }
        return job;
    }
    async retryJob(id) {
        return this.jobsService.retryJob(id);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'ジョブ履歴一覧取得' }),
    (0, swagger_1.ApiQuery)({
        name: 'sourceId',
        required: false,
        description: 'ソースIDでフィルタ',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['success', 'failed'],
        description: 'ステータスでフィルタ',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'ページ番号（デフォルト: 1）',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: '1ページあたりの件数（デフォルト: 50）',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ジョブ履歴一覧',
    }),
    __param(0, (0, common_1.Query)('sourceId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ジョブ詳細取得' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ジョブID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ジョブ詳細',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ジョブが見つからない',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Post)(':id/retry'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '失敗したジョブのリトライ' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ジョブID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'リトライに成功',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                articleCount: { type: 'number' },
                duration: { type: 'number' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ジョブが見つからない',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'リトライできない状態（成功している、リトライ上限到達、ソースが無効など）',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "retryJob", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map