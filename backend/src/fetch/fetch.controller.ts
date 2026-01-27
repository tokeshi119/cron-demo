import {
  Controller,
  Post,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { FetchService } from './fetch.service';

@ApiTags('fetch')
@Controller('sources')
export class FetchController {
  constructor(private readonly fetchService: FetchService) {}

  @Post(':id/fetch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'RSSフィードの手動取得' })
  @ApiParam({ name: 'id', description: 'ソースID' })
  @ApiResponse({
    status: 200,
    description: 'RSS取得に成功',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        articleCount: { type: 'number' },
        duration: { type: 'number', description: '所要時間（ミリ秒）' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'ソースが見つからない',
  })
  @ApiResponse({
    status: 400,
    description: 'RSS取得に失敗、またはソースが無効',
  })
  async fetch(@Param('id') id: string) {
    return this.fetchService.fetchFeed(id);
  }
}
