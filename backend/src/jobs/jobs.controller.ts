import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'ジョブ履歴一覧取得' })
  @ApiQuery({
    name: 'sourceId',
    required: false,
    description: 'ソースIDでフィルタ',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['success', 'failed'],
    description: 'ステータスでフィルタ',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'ページ番号（デフォルト: 1）',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '1ページあたりの件数（デフォルト: 50）',
  })
  @ApiResponse({
    status: 200,
    description: 'ジョブ履歴一覧',
  })
  async getJobs(
    @Query('sourceId') sourceId?: string,
    @Query('status') status?: 'success' | 'failed',
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.jobsService.getJobs({
      sourceId,
      status,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'ジョブ詳細取得' })
  @ApiParam({ name: 'id', description: 'ジョブID' })
  @ApiResponse({
    status: 200,
    description: 'ジョブ詳細',
  })
  @ApiResponse({
    status: 404,
    description: 'ジョブが見つからない',
  })
  async getJobById(@Param('id') id: string) {
    const job = await this.jobsService.getJobById(id);
    if (!job) {
      throw new NotFoundException(`ID ${id} のジョブが見つかりません`);
    }
    return job;
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '失敗したジョブのリトライ' })
  @ApiParam({ name: 'id', description: 'ジョブID' })
  @ApiResponse({
    status: 200,
    description: 'リトライに成功',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        articleCount: { type: 'number' },
        duration: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'ジョブが見つからない',
  })
  @ApiResponse({
    status: 400,
    description: 'リトライできない状態（成功している、リトライ上限到達、ソースが無効など）',
  })
  async retryJob(@Param('id') id: string) {
    return this.jobsService.retryJob(id);
  }
}
