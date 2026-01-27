import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly runningJobs = new Set<string>(); // 実行中のジョブを追跡

  constructor(
    private readonly prisma: PrismaService,
    private readonly fetchService: FetchService,
  ) {}

  /**
   * 有効なソースを5分ごとに取得（検証用）
   * 本番環境では CronExpression.EVERY_HOUR に変更してください
   */
  @Cron('*/5 * * * *') // 5分ごと
  async handleCron() {
    this.logger.log('Cronジョブ開始: 有効なソースのRSS取得');

    try {
      // 有効なソースを取得
      const enabledSources = await this.prisma.source.findMany({
        where: { enabled: true },
      });

      if (enabledSources.length === 0) {
        this.logger.log('有効なソースがありません');
        return;
      }

      this.logger.log(`${enabledSources.length}件のソースを取得します`);

      // 各ソースを並列で取得（重複実行を防止）
      const fetchPromises = enabledSources.map((source) =>
        this.fetchSourceSafely(source.id, source.name),
      );

      await Promise.allSettled(fetchPromises);

      this.logger.log('Cronジョブ完了');
    } catch (error) {
      this.logger.error(
        `Cronジョブでエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  /**
   * ソースを安全に取得（重複実行を防止）
   */
  private async fetchSourceSafely(sourceId: string, sourceName: string) {
    // 既に実行中の場合はスキップ
    if (this.runningJobs.has(sourceId)) {
      this.logger.warn(
        `ソース "${sourceName}" (${sourceId}) は既に実行中のためスキップします`,
      );
      return;
    }

    this.runningJobs.add(sourceId);

    try {
      await this.fetchService.fetchFeed(sourceId);
    } catch (error) {
      // エラーはログに記録するが、他のソースの処理は続行
      this.logger.error(
        `ソース "${sourceName}" (${sourceId}) の取得に失敗: ${error instanceof Error ? error.message : '不明なエラー'}`,
      );
    } finally {
      // 実行完了後にSetから削除
      this.runningJobs.delete(sourceId);
    }
  }
}
