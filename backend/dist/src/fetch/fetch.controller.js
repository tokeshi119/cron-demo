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
exports.FetchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fetch_service_1 = require("./fetch.service");
let FetchController = class FetchController {
    fetchService;
    constructor(fetchService) {
        this.fetchService = fetchService;
    }
    async fetch(id) {
        return this.fetchService.fetchFeed(id);
    }
};
exports.FetchController = FetchController;
__decorate([
    (0, common_1.Post)(':id/fetch'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'RSSフィードの手動取得' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ソースID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'RSS取得に成功',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                articleCount: { type: 'number' },
                duration: { type: 'number', description: '所要時間（ミリ秒）' },
                message: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ソースが見つからない',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'RSS取得に失敗、またはソースが無効',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FetchController.prototype, "fetch", null);
exports.FetchController = FetchController = __decorate([
    (0, swagger_1.ApiTags)('fetch'),
    (0, common_1.Controller)('sources'),
    __metadata("design:paramtypes", [fetch_service_1.FetchService])
], FetchController);
//# sourceMappingURL=fetch.controller.js.map