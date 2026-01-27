import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { OutboxController } from './outbox.controller';
import { OutboxWorker } from './outbox.worker';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OutboxController],
  providers: [OutboxService, OutboxWorker, PrismaService],
  exports: [OutboxService, OutboxWorker],
})
export class OutboxModule {}
