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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSourceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSourceDto {
    url;
    name;
    enabled;
}
exports.CreateSourceDto = CreateSourceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'RSSフィードのURL',
        example: 'https://example.com/feed.xml',
    }),
    (0, class_validator_1.IsUrl)({}, { message: '有効なURLを入力してください' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'URLは必須です' }),
    __metadata("design:type", String)
], CreateSourceDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ソースの名前',
        example: 'Example Tech Blog',
    }),
    (0, class_validator_1.IsString)({ message: '名前は文字列である必要があります' }),
    (0, class_validator_1.IsNotEmpty)({ message: '名前は必須です' }),
    __metadata("design:type", String)
], CreateSourceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '有効/無効フラグ',
        example: true,
        required: false,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'enabledは真偽値である必要があります' }),
    __metadata("design:type", Boolean)
], CreateSourceDto.prototype, "enabled", void 0);
//# sourceMappingURL=create-source.dto.js.map