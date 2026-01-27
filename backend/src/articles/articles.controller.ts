import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { GetArticlesDto } from './dto/get-articles.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: '記事一覧取得（フィルタ、検索、ソート、ページネーション対応）' })
  @ApiResponse({
    status: 200,
    description: '記事一覧の取得に成功',
    schema: {
      type: 'object',
      properties: {
        articles: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '記事が存在しない場合、空の配列を返す',
  })
  async findAll(@Query() query: GetArticlesDto) {
    return this.articlesService.findAll(query);
  }
}
