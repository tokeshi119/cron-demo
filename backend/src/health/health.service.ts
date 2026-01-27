import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    try {
      // DB疎通確認
      await this.prisma.$queryRaw`SELECT 1`;
      
      // 役割判定（PostgreSQLのレプリカ判定）
      const result = await this.prisma.$queryRaw<Array<{ pg_is_in_recovery: boolean }>>`
        SELECT pg_is_in_recovery()
      `;
      const isReplica = result[0]?.pg_is_in_recovery ?? false;

      return {
        status: 'ok',
        database: 'connected',
        role: isReplica ? 'replica' : 'primary',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
}
