import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';

export interface GetJobsParams {
  sourceId?: string;
  status?: 'success' | 'failed';
  page?: number;
  limit?: number;
}

export interface JobsResponse {
  jobs: Array<{
    id: string;
    sourceId: string;
    source: {
      id: string;
      name: string;
      url: string;
    };
    status: 'success' | 'failed';
    error: string | null;
    duration: number | null;
    articleCount: number | null;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  statistics: {
    totalJobs: number;
    successCount: number;
    failedCount: number;
    averageDuration: number | null;
  };
}

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);
  private readonly MAX_RETRY_COUNT = 3; // リトライ上限

  constructor(
    private readonly prisma: PrismaService,
    private readonly fetchService: FetchService,
  ) {}

  /**
   * ジョブ履歴一覧を取得
   */
  async getJobs(params: GetJobsParams = {}): Promise<JobsResponse> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 50;
    const skip = (page - 1) * limit;

    // フィルタ条件を構築
    const where: any = {};
    if (params.sourceId) {
      where.sourceId = params.sourceId;
    }
    if (params.status) {
      where.status = params.status;
    }

    // ジョブ一覧を取得（最新順）
    const [jobs, total] = await Promise.all([
      this.prisma.fetchJob.findMany({
        where,
        include: {
          source: {
            select: {
              id: true,
              name: true,
              url: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.fetchJob.count({ where }),
    ]);

    // 統計情報を取得
    const allJobs = await this.prisma.fetchJob.findMany({
      where: params.sourceId ? { sourceId: params.sourceId } : undefined,
      select: {
        status: true,
        duration: true,
      },
    });

    const successCount = allJobs.filter((j) => j.status === 'success').length;
    const failedCount = allJobs.filter((j) => j.status === 'failed').length;

    // 平均実行時間を計算（成功したジョブのみ）
    const successfulDurations = allJobs
      .filter((j) => j.status === 'success' && j.duration !== null)
      .map((j) => j.duration!);
    const averageDuration =
      successfulDurations.length > 0
        ? successfulDurations.reduce((a, b) => a + b, 0) /
          successfulDurations.length
        : null;

    return {
      jobs: jobs.map((job) => ({
        id: job.id,
        sourceId: job.sourceId,
        source: job.source,
        status: job.status as 'success' | 'failed',
        error: job.error,
        duration: job.duration,
        articleCount: job.articleCount,
        createdAt: job.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      statistics: {
        totalJobs: allJobs.length,
        successCount,
        failedCount,
        averageDuration: averageDuration ? Math.round(averageDuration) : null,
      },
    };
  }

  /**
   * ジョブ詳細を取得
   */
  async getJobById(id: string) {
    const job = await this.prisma.fetchJob.findUnique({
      where: { id },
      include: {
        source: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });

    if (!job) {
      return null;
    }

    return {
      id: job.id,
      sourceId: job.sourceId,
      source: job.source,
      status: job.status as 'success' | 'failed',
      error: job.error,
      duration: job.duration,
      articleCount: job.articleCount,
      createdAt: job.createdAt.toISOString(),
    };
  }

  /**
   * 失敗したジョブをリトライ
   */
  async retryJob(jobId: string) {
    // ジョブを取得
    const job = await this.prisma.fetchJob.findUnique({
      where: { id: jobId },
      include: {
        source: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`ID ${jobId} のジョブが見つかりません`);
    }

    // 成功したジョブはリトライ不可
    if (job.status === 'success') {
      throw new BadRequestException(
        '成功したジョブはリトライできません。失敗したジョブのみリトライ可能です。',
      );
    }

    // 同じソースの失敗ジョブ数をカウント（リトライ回数の制限チェック用）
    const failedJobsCount = await this.prisma.fetchJob.count({
      where: {
        sourceId: job.sourceId,
        status: 'failed',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // 過去24時間
        },
      },
    });

    // リトライ上限チェック（過去24時間で3回以上失敗している場合はリトライ不可）
    if (failedJobsCount >= this.MAX_RETRY_COUNT) {
      throw new BadRequestException(
        `リトライ上限（${this.MAX_RETRY_COUNT}回）に達しています。時間をおいて再度お試しください。`,
      );
    }

    // ソースが無効になっている場合はリトライ不可
    if (!job.source.enabled) {
      throw new BadRequestException(
        `ソース "${job.source.name}" が無効になっているため、リトライできません。`,
      );
    }

    this.logger.log(
      `ジョブリトライ開始: ${job.source.name} (ジョブID: ${jobId})`,
    );

    try {
      // ジョブを再実行
      const result = await this.fetchService.fetchFeed(job.sourceId);

      this.logger.log(
        `ジョブリトライ成功: ${job.source.name} - ${result.articleCount}件の記事を取得`,
      );

      return {
        success: true,
        message: `リトライに成功しました。${result.articleCount}件の記事を取得しました。`,
        articleCount: result.articleCount,
        duration: result.duration,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '不明なエラー';
      this.logger.error(
        `ジョブリトライ失敗: ${job.source.name} - ${errorMessage}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw new BadRequestException(
        `リトライに失敗しました: ${errorMessage}`,
      );
    }
  }
}
