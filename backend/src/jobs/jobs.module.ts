import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { FetchModule } from '../fetch/fetch.module';

@Module({
  imports: [FetchModule],
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
  exports: [JobsService],
})
export class JobsModule {}
