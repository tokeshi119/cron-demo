import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: '記事一覧取得' })
  @ApiResponse({
    status: 200,
    description: '記事一覧の取得に成功',
  })
  @ApiResponse({
    status: 200,
    description: '記事が存在しない場合、空の配列を返す',
  })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles;
  }
}
