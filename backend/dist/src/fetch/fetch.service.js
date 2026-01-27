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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FetchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const rss_parser_1 = __importDefault(require("rss-parser"));
function stripHtmlTags(html) {
    if (!html)
        return '';
    return html.replace(/<[^>]*>/g, '').trim();
}
function truncateString(str, maxLength) {
    if (str.length <= maxLength)
        return str;
    return str.substring(0, maxLength - 3) + '...';
}
let FetchService = FetchService_1 = class FetchService {
    prisma;
    logger = new common_1.Logger(FetchService_1.name);
    parser;
    constructor(prisma) {
        this.prisma = prisma;
        this.parser = new rss_parser_1.default({
            timeout: 10000,
            customFields: {
                item: ['content:encoded', 'description'],
            },
        });
    }
    async fetchFeed(sourceId) {
        const startTime = Date.now();
        const source = await this.prisma.source.findUnique({
            where: { id: sourceId },
        });
        if (!source) {
            throw new common_1.NotFoundException(`ID ${sourceId} のソースが見つかりません`);
        }
        if (!source.enabled) {
            throw new common_1.BadRequestException(`ソース "${source.name}" は無効になっています`);
        }
        try {
            this.logger.log(`RSS取得開始: ${source.name} (${source.url})`);
            const feed = await this.parser.parseURL(source.url);
            if (!feed.items || feed.items.length === 0) {
                const duration = Date.now() - startTime;
                await this.saveFetchJob(sourceId, 'success', null, duration, 0);
                this.logger.log(`RSS取得完了（記事なし）: ${source.name}`);
                return {
                    success: true,
                    articleCount: 0,
                    duration,
                    message: '記事が見つかりませんでした',
                };
            }
            let savedCount = 0;
            await this.prisma.$transaction(async (tx) => {
                for (const item of feed.items) {
                    if (!item.link || !item.title) {
                        continue;
                    }
                    try {
                        const title = truncateString(stripHtmlTags(item.title), 500);
                        const description = item.contentSnippet
                            ? truncateString(stripHtmlTags(item.contentSnippet), 5000)
                            : item.content
                                ? truncateString(stripHtmlTags(item.content), 5000)
                                : null;
                        let publishedAt = null;
                        if (item.pubDate) {
                            const parsedDate = new Date(item.pubDate);
                            if (!isNaN(parsedDate.getTime())) {
                                publishedAt = parsedDate;
                            }
                        }
                        await tx.article.upsert({
                            where: { url: item.link },
                            update: {
                                title,
                                description,
                                publishedAt,
                                updatedAt: new Date(),
                            },
                            create: {
                                sourceId: source.id,
                                url: item.link,
                                title,
                                description,
                                publishedAt,
                            },
                        });
                        savedCount++;
                    }
                    catch (error) {
                        this.logger.warn(`記事の保存に失敗: ${item.link} - ${error.message}`);
                    }
                }
            });
            const duration = Date.now() - startTime;
            await this.saveFetchJob(sourceId, 'success', null, duration, savedCount);
            this.logger.log(`RSS取得完了: ${source.name} - ${savedCount}件の記事を保存（${duration}ms）`);
            return {
                success: true,
                articleCount: savedCount,
                duration,
                message: `${savedCount}件の記事を保存しました`,
            };
        }
        catch (error) {
            const duration = Date.now() - startTime;
            const errorMessage = error instanceof Error ? error.message : '不明なエラー';
            let detailedMessage = errorMessage;
            if (errorMessage.includes('timeout')) {
                detailedMessage = 'RSS取得がタイムアウトしました';
            }
            else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
                detailedMessage = 'RSSフィードに接続できませんでした';
            }
            else if (errorMessage.includes('Invalid XML')) {
                detailedMessage = '無効なRSSフィード形式です';
            }
            await this.saveFetchJob(sourceId, 'failed', detailedMessage, duration, 0);
            this.logger.error(`RSS取得失敗: ${source.name} - ${detailedMessage}`, error instanceof Error ? error.stack : undefined);
            throw new common_1.BadRequestException(`RSS取得に失敗しました: ${detailedMessage}`);
        }
    }
    async saveFetchJob(sourceId, status, error, duration, articleCount) {
        try {
            await this.prisma.fetchJob.create({
                data: {
                    sourceId,
                    status,
                    error,
                    duration,
                    articleCount,
                },
            });
        }
        catch (error) {
            this.logger.error(`ジョブ履歴の保存に失敗: ${error instanceof Error ? error.message : '不明なエラー'}`);
        }
    }
};
exports.FetchService = FetchService;
exports.FetchService = FetchService = FetchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FetchService);
//# sourceMappingURL=fetch.service.js.map