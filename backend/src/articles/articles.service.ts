import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * すべての記事を取得
   */
  async findAll() {
    return this.prisma.article.findMany({
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
    });
  }
}
