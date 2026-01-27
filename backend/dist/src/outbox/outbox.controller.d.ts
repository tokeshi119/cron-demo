import { OutboxService } from './outbox.service';
export declare class OutboxController {
    private readonly outboxService;
    constructor(outboxService: OutboxService);
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
}
