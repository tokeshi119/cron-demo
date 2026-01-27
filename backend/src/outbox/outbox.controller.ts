import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OutboxService } from './outbox.service';

@ApiTags('outbox')
@Controller('outbox')
export class OutboxController {
  constructor(private readonly outboxService: OutboxService) {}

  @Get()
  @ApiOperation({ summary: 'Outbox一覧取得' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'processing', 'done', 'failed'],
    description: 'ステータスでフィルタ',
  })
  @ApiResponse({
    status: 200,
    description: 'Outbox一覧の取得に成功',
  })
  async findAll(@Query('status') status?: string) {
    return this.outboxService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Outboxタスク取得' })
  @ApiParam({ name: 'id', description: 'OutboxタスクID' })
  @ApiResponse({
    status: 200,
    description: 'Outboxタスクの取得に成功',
  })
  @ApiResponse({
    status: 404,
    description: 'Outboxタスクが見つからない',
  })
  async findOne(@Param('id') id: string) {
    return this.outboxService.findOne(id);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '失敗したタスクのリトライ' })
  @ApiParam({ name: 'id', description: 'OutboxタスクID' })
  @ApiResponse({
    status: 200,
    description: 'リトライに成功',
  })
  @ApiResponse({
    status: 404,
    description: 'Outboxタスクが見つからない',
  })
  @ApiResponse({
    status: 400,
    description: 'リトライできない状態（失敗していない、リトライ上限到達など）',
  })
  async retry(@Param('id') id: string) {
    return this.outboxService.retry(id);
  }
}
