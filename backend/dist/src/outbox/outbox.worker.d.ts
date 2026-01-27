import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxService } from './outbox.service';
export declare class OutboxWorker implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly outboxService;
    private readonly logger;
    private readonly POLLING_INTERVAL_MS;
    private readonly MAX_RETRY_COUNT;
    private intervalId;
    private isRunning;
    constructor(prisma: PrismaService, outboxService: OutboxService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    start(): void;
    stop(): void;
    private resetTimeoutTasks;
    private processTasks;
    private processTask;
    private processArticleTask;
}
