import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('healthz')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'ヘルスチェック' })
  @ApiResponse({ status: 200, description: '正常' })
  @ApiResponse({ status: 503, description: 'サービス利用不可' })
  async check() {
    return this.healthService.check();
  }
}
