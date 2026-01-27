import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { FetchService } from '../fetch/fetch.service';
import { FetchController } from '../fetch/fetch.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SourcesController, FetchController],
  providers: [SourcesService, FetchService, PrismaService],
  exports: [SourcesService, FetchService],
})
export class SourcesModule {}
