import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OutboxWorker.name);
  private readonly POLLING_INTERVAL_MS = 5000; // 5秒
  private readonly MAX_RETRY_COUNT = 3;
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly outboxService: OutboxService,
  ) {}

  async onModuleInit() {
    this.logger.log('Outboxワーカーを起動します...');
    this.start();
  }

  async onModuleDestroy() {
    this.logger.log('Outboxワーカーを停止します...');
    this.stop();
  }

  /**
   * ワーカーを開始
   */
  start() {
    if (this.isRunning) {
      this.logger.warn('ワーカーは既に実行中です');
      return;
    }

    this.isRunning = true;
    this.logger.log(`ワーカーを開始しました（ポーリング間隔: ${this.POLLING_INTERVAL_MS}ms）`);

    // 初回実行
    this.processTasks();

    // 定期的に実行
    this.intervalId = setInterval(() => {
      this.processTasks();
    }, this.POLLING_INTERVAL_MS);
  }

  /**
   * ワーカーを停止
   */
  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.logger.log('ワーカーを停止しました');
  }

  /**
   * タイムアウトしたタスクをリセット
   */
  private async resetTimeoutTasks() {
    try {
      await this.outboxService.resetTimeoutTasks();
    } catch (error) {
      this.logger.error(`タイムアウトタスクのリセットに失敗: ${error.message}`);
    }
  }

  /**
   * タスクを処理
   */
  private async processTasks() {
    try {
      // タイムアウトしたタスクをリセット
      await this.resetTimeoutTasks();

      // FOR UPDATE SKIP LOCKED でタスクを取得
      const tasks = await this.prisma.$queryRaw<Array<{
        id: string;
        type: string;
        payload: any;
        status: string;
        retryCount: number;
      }>>`
        SELECT id, type, payload, status, "retryCount"
        FROM outbox
        WHERE status = 'pending'
        ORDER BY "createdAt" ASC
        LIMIT 10
        FOR UPDATE SKIP LOCKED
      `;

      if (tasks.length === 0) {
        return; // 処理するタスクがない
      }

      this.logger.log(`${tasks.length}件のタスクを取得しました`);

      // 各タスクを処理
      for (const task of tasks) {
        await this.processTask(task);
      }
    } catch (error) {
      this.logger.error(`タスク処理中にエラーが発生: ${error.message}`, error.stack);
    }
  }

  /**
   * 個別のタスクを処理
   */
  private async processTask(task: {
    id: string;
    type: string;
    payload: any;
    status: string;
    retryCount: number;
  }) {
    const startTime = Date.now();

    try {
      // ステータスをprocessingに更新
      await this.prisma.outbox.update({
        where: { id: task.id },
        data: {
          status: 'processing',
          updatedAt: new Date(),
        },
      });

      this.logger.log(`タスク処理開始: ${task.id} (type: ${task.type})`);

      // タスクタイプに応じた処理
      if (task.type === 'article_processing') {
        await this.processArticleTask(task.payload);
      } else {
        throw new Error(`未知のタスクタイプ: ${task.type}`);
      }

      // 処理成功
      const duration = Date.now() - startTime;
      await this.prisma.outbox.update({
        where: { id: task.id },
        data: {
          status: 'done',
          processedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      this.logger.log(`タスク処理完了: ${task.id} (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      const shouldRetry = task.retryCount < this.MAX_RETRY_COUNT;

      // ステータスを更新
      await this.prisma.outbox.update({
        where: { id: task.id },
        data: {
          status: shouldRetry ? 'pending' : 'failed',
          error: errorMessage,
          retryCount: task.retryCount + 1,
          updatedAt: new Date(),
        },
      });

      if (shouldRetry) {
        this.logger.warn(
          `タスク処理失敗（リトライ可能）: ${task.id} - ${errorMessage} (${duration}ms)`,
        );
      } else {
        this.logger.error(
          `タスク処理失敗（リトライ上限到達）: ${task.id} - ${errorMessage} (${duration}ms)`,
        );
      }
    }
  }

  /**
   * 記事処理タスクを実行
   * サンプル処理: 記事タイトルの文字数カウントなど
   */
  private async processArticleTask(payload: {
    articleId: string;
    title: string;
    url: string;
  }) {
    // サンプル処理: 記事タイトルの文字数をログに出力
    const titleLength = payload.title.length;
    this.logger.log(
      `記事処理: ${payload.articleId} - タイトル文字数: ${titleLength}`,
    );

    // ここで実際の処理を実装
    // 例: タグ付け、要約生成、外部API呼び出しなど

    // 処理が完了したことを確認するため、少し待機（実際の処理では不要）
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
