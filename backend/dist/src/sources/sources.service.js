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
exports.SourcesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SourcesService = class SourcesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.source.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const source = await this.prisma.source.findUnique({
            where: { id },
        });
        if (!source) {
            throw new common_1.NotFoundException(`ID ${id} のソースが見つかりません`);
        }
        return source;
    }
    async create(createSourceDto) {
        const existingSource = await this.prisma.source.findUnique({
            where: { url: createSourceDto.url },
        });
        if (existingSource) {
            throw new common_1.ConflictException(`URL "${createSourceDto.url}" は既に登録されています`);
        }
        try {
            return await this.prisma.source.create({
                data: {
                    url: createSourceDto.url,
                    name: createSourceDto.name,
                    enabled: createSourceDto.enabled ?? true,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException(`URL "${createSourceDto.url}" は既に登録されています`);
            }
            throw new common_1.BadRequestException(`ソースの作成に失敗しました: ${error.message}`);
        }
    }
    async update(id, updateSourceDto) {
        await this.findOne(id);
        try {
            return await this.prisma.source.update({
                where: { id },
                data: {
                    ...(updateSourceDto.name !== undefined && { name: updateSourceDto.name }),
                    ...(updateSourceDto.enabled !== undefined && {
                        enabled: updateSourceDto.enabled,
                    }),
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`ソースの更新に失敗しました: ${error.message}`);
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.source.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`ソースの削除に失敗しました: ${error.message}`);
        }
    }
};
exports.SourcesService = SourcesService;
exports.SourcesService = SourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SourcesService);
//# sourceMappingURL=sources.service.js.map