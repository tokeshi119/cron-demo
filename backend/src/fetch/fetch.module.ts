import { Module } from '@nestjs/common';
import { FetchService } from './fetch.service';
import { FetchController } from './fetch.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FetchController],
  providers: [FetchService, PrismaService],
  exports: [FetchService],
})
export class FetchModule {}
