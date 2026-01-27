import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);
  private readonly MAX_RETRY_COUNT = 3;
  private readonly PROCESSING_TIMEOUT_MS = 10 * 60 * 1000; // 10分

  constructor(private readonly prisma: PrismaService) {}

  /**
   * ステータスでフィルタしてOutbox一覧を取得
   */
  async findAll(status?: string) {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    return this.prisma.outbox.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // 最大100件まで
    });
  }

  /**
   * IDでOutboxタスクを取得
   */
  async findOne(id: string) {
    const task = await this.prisma.outbox.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`ID ${id} のOutboxタスクが見つかりません`);
    }

    return task;
  }

  /**
   * 失敗したタスクをリトライ（ステータスをpendingに戻す）
   */
  async retry(id: string) {
    const task = await this.findOne(id);

    if (task.status !== 'failed') {
      throw new Error(`リトライできるのは失敗したタスクのみです（現在のステータス: ${task.status}）`);
    }

    if (task.retryCount >= this.MAX_RETRY_COUNT) {
      throw new Error(`リトライ上限（${this.MAX_RETRY_COUNT}回）に達しています`);
    }

    return this.prisma.outbox.update({
      where: { id },
      data: {
        status: 'pending',
        error: null,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * タイムアウトしたタスクをリセット（processing → pending）
   */
  async resetTimeoutTasks() {
    const timeoutThreshold = new Date(Date.now() - this.PROCESSING_TIMEOUT_MS);

    const result = await this.prisma.outbox.updateMany({
      where: {
        status: 'processing',
        updatedAt: {
          lt: timeoutThreshold,
        },
      },
      data: {
        status: 'pending',
        error: 'タイムアウトによりリセットされました',
      },
    });

    if (result.count > 0) {
      this.logger.warn(`${result.count}件のタイムアウトタスクをリセットしました`);
    }

    return result.count;
  }
}
