import { PrismaService } from '../prisma/prisma.service';
export declare class FetchService {
    private readonly prisma;
    private readonly logger;
    private readonly parser;
    constructor(prisma: PrismaService);
    fetchFeed(sourceId: string): Promise<{
        success: boolean;
        articleCount: number;
        duration: number;
        message: string;
    }>;
    private saveFetchJob;
}
