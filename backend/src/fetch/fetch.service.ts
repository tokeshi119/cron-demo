import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Parser from 'rss-parser';

// HTMLタグを除去する関数
function stripHtmlTags(html: string | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

// 文字列長を制限する関数
function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

@Injectable()
export class FetchService {
  private readonly logger = new Logger(FetchService.name);
  private readonly parser: Parser;

  constructor(private readonly prisma: PrismaService) {
    this.parser = new Parser({
      timeout: 10000, // 10秒のタイムアウト
      customFields: {
        item: ['content:encoded', 'description'],
      },
    });
  }

  /**
   * RSSフィードを取得して記事を保存
   * @param sourceId ソースID
   * @returns 取得結果（成功/失敗、取得記事数、所要時間）
   */
  async fetchFeed(sourceId: string) {
    const startTime = Date.now();

    // ソースの存在確認
    const source = await this.prisma.source.findUnique({
      where: { id: sourceId },
    });

    if (!source) {
      throw new NotFoundException(`ID ${sourceId} のソースが見つかりません`);
    }

    if (!source.enabled) {
      throw new BadRequestException(
        `ソース "${source.name}" は無効になっています`,
      );
    }

    try {
      this.logger.log(`RSS取得開始: ${source.name} (${source.url})`);

      // RSSフィードを取得
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

      // トランザクション内で記事を保存
      let savedCount = 0;
      await this.prisma.$transaction(async (tx) => {
        for (const item of feed.items) {
          if (!item.link || !item.title) {
            // linkまたはtitleがない場合はスキップ
            continue;
          }

          try {
            // データ正規化
            const title = truncateString(stripHtmlTags(item.title), 500);
            const description = item.contentSnippet
              ? truncateString(stripHtmlTags(item.contentSnippet), 5000)
              : item.content
                ? truncateString(stripHtmlTags(item.content), 5000)
                : null;

            // publishedAtのパース
            let publishedAt: Date | null = null;
            if (item.pubDate) {
              const parsedDate = new Date(item.pubDate);
              if (!isNaN(parsedDate.getTime())) {
                publishedAt = parsedDate;
              }
            }

            // Upsert（urlをUNIQUE制約として使用）
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
          } catch (error) {
            // 個別の記事保存エラーはログに記録して続行
            this.logger.warn(
              `記事の保存に失敗: ${item.link} - ${error.message}`,
            );
          }
        }
      });

      const duration = Date.now() - startTime;

      // ジョブ履歴を保存
      await this.saveFetchJob(
        sourceId,
        'success',
        null,
        duration,
        savedCount,
      );

      this.logger.log(
        `RSS取得完了: ${source.name} - ${savedCount}件の記事を保存（${duration}ms）`,
      );

      return {
        success: true,
        articleCount: savedCount,
        duration,
        message: `${savedCount}件の記事を保存しました`,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : '不明なエラー';

      // エラーの種類に応じたメッセージ
      let detailedMessage = errorMessage;
      if (errorMessage.includes('timeout')) {
        detailedMessage = 'RSS取得がタイムアウトしました';
      } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
        detailedMessage = 'RSSフィードに接続できませんでした';
      } else if (errorMessage.includes('Invalid XML')) {
        detailedMessage = '無効なRSSフィード形式です';
      }

      // ジョブ履歴を保存（失敗）
      await this.saveFetchJob(
        sourceId,
        'failed',
        detailedMessage,
        duration,
        0,
      );

      this.logger.error(
        `RSS取得失敗: ${source.name} - ${detailedMessage}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw new BadRequestException(
        `RSS取得に失敗しました: ${detailedMessage}`,
      );
    }
  }

  /**
   * ジョブ履歴を保存
   */
  private async saveFetchJob(
    sourceId: string,
    status: 'success' | 'failed',
    error: string | null,
    duration: number,
    articleCount: number,
  ) {
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
    } catch (error) {
      // ジョブ履歴の保存失敗はログに記録するが、例外は投げない
      this.logger.error(
        `ジョブ履歴の保存に失敗: ${error instanceof Error ? error.message : '不明なエラー'}`,
      );
    }
  }
}
