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
exports.SourcesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sources_service_1 = require("./sources.service");
const create_source_dto_1 = require("./dto/create-source.dto");
const update_source_dto_1 = require("./dto/update-source.dto");
let SourcesController = class SourcesController {
    sourcesService;
    constructor(sourcesService) {
        this.sourcesService = sourcesService;
    }
    findAll() {
        return this.sourcesService.findAll();
    }
    create(createSourceDto) {
        return this.sourcesService.create(createSourceDto);
    }
    findOne(id) {
        return this.sourcesService.findOne(id);
    }
    update(id, updateSourceDto) {
        return this.sourcesService.update(id, updateSourceDto);
    }
    remove(id) {
        return this.sourcesService.remove(id);
    }
};
exports.SourcesController = SourcesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'ソース一覧取得' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ソース一覧の取得に成功',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'ソース登録' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'ソースの登録に成功',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'URLが既に登録されている',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'バリデーションエラー',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_source_dto_1.CreateSourceDto]),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ソース取得' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ソースID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ソースの取得に成功',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ソースが見つからない',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ソース更新' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ソースID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ソースの更新に成功',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ソースが見つからない',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'バリデーションエラー',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_source_dto_1.UpdateSourceDto]),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'ソース削除' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ソースID' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'ソースの削除に成功',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'ソースが見つからない',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SourcesController.prototype, "remove", null);
exports.SourcesController = SourcesController = __decorate([
    (0, swagger_1.ApiTags)('sources'),
    (0, common_1.Controller)('sources'),
    __metadata("design:paramtypes", [sources_service_1.SourcesService])
], SourcesController);
//# sourceMappingURL=sources.controller.js.map