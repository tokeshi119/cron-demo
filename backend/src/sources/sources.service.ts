import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Injectable()
export class SourcesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * すべてのソースを取得
   */
  async findAll() {
    return this.prisma.source.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * IDでソースを取得
   */
  async findOne(id: string) {
    const source = await this.prisma.source.findUnique({
      where: { id },
    });

    if (!source) {
      throw new NotFoundException(`ID ${id} のソースが見つかりません`);
    }

    return source;
  }

  /**
   * 新しいソースを作成
   */
  async create(createSourceDto: CreateSourceDto) {
    // URLの重複チェック
    const existingSource = await this.prisma.source.findUnique({
      where: { url: createSourceDto.url },
    });

    if (existingSource) {
      throw new ConflictException(
        `URL "${createSourceDto.url}" は既に登録されています`,
      );
    }

    try {
      return await this.prisma.source.create({
        data: {
          url: createSourceDto.url,
          name: createSourceDto.name,
          enabled: createSourceDto.enabled ?? true,
        },
      });
    } catch (error) {
      // Prismaのユニーク制約エラーをキャッチ
      if (error.code === 'P2002') {
        throw new ConflictException(
          `URL "${createSourceDto.url}" は既に登録されています`,
        );
      }
      throw new BadRequestException(`ソースの作成に失敗しました: ${error.message}`);
    }
  }

  /**
   * ソースを更新
   */
  async update(id: string, updateSourceDto: UpdateSourceDto) {
    // ソースの存在確認
    await this.findOne(id);

    try {
      return await this.prisma.source.update({
        where: { id },
        data: {
          ...(updateSourceDto.name !== undefined && { name: updateSourceDto.name }),
          ...(updateSourceDto.enabled !== undefined && {
            enabled: updateSourceDto.enabled,
          }),
        },
      });
    } catch (error) {
      throw new BadRequestException(`ソースの更新に失敗しました: ${error.message}`);
    }
  }

  /**
   * ソースを削除
   */
  async remove(id: string) {
    // ソースの存在確認
    await this.findOne(id);

    try {
      return await this.prisma.source.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(`ソースの削除に失敗しました: ${error.message}`);
    }
  }
}
