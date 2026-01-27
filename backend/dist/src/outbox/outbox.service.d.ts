import { PrismaService } from '../prisma/prisma.service';
export declare class OutboxService {
    private readonly prisma;
    private readonly logger;
    private readonly MAX_RETRY_COUNT;
    private readonly PROCESSING_TIMEOUT_MS;
    constructor(prisma: PrismaService);
    findAll(status?: string): Promise<{
        error: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        payload: import(".prisma/client/runtime/library").JsonValue;
        retryCount: number;
        processedAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        error: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        payload: import(".prisma/client/runtime/library").JsonValue;
        retryCount: number;
        processedAt: Date | null;
    }>;
    retry(id: string): Promise<{
        error: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        payload: import(".prisma/client/runtime/library").JsonValue;
        retryCount: number;
        processedAt: Date | null;
    }>;
    resetTimeoutTasks(): Promise<number>;
}
