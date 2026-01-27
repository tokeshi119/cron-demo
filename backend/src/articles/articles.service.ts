import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetArticlesDto } from './dto/get-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 記事一覧を取得（フィルタ、検索、ソート、ページネーション対応）
   */
  async findAll(query: GetArticlesDto) {
    const {
      query: searchQuery,
      sourceId,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20,
    } = query;

    // 検索条件の構築
    const where: any = {};

    // ソースIDでフィルタ
    if (sourceId) {
      where.sourceId = sourceId;
    }

    // 検索クエリ（タイトルまたはURL）
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { url: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    // ソート順の設定
    let orderBy: any;
    if (sort === 'publishedAt') {
      // publishedAtがnullの場合は最後に表示
      // 複数フィールドでソートする場合は配列形式を使用
      orderBy = [
        { publishedAt: order },
        { createdAt: order }, // セカンダリソート
      ];
    } else {
      orderBy = { [sort]: order };
    }

    // ページネーション計算
    const skip = (page - 1) * limit;

    // 記事と総件数を並列取得
    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
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
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
