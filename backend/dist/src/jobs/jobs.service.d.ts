import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';
export interface GetJobsParams {
    sourceId?: string;
    status?: 'success' | 'failed';
    page?: number;
    limit?: number;
}
export interface JobsResponse {
    jobs: Array<{
        id: string;
        sourceId: string;
        source: {
            id: string;
            name: string;
            url: string;
        };
        status: 'success' | 'failed';
        error: string | null;
        duration: number | null;
        articleCount: number | null;
        createdAt: string;
    }>;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    statistics: {
        totalJobs: number;
        successCount: number;
        failedCount: number;
        averageDuration: number | null;
    };
}
export declare class JobsService {
    private readonly prisma;
    private readonly fetchService;
    private readonly logger;
    private readonly MAX_RETRY_COUNT;
    constructor(prisma: PrismaService, fetchService: FetchService);
    getJobs(params?: GetJobsParams): Promise<JobsResponse>;
    getJobById(id: string): Promise<{
        id: string;
        sourceId: string;
        source: {
            id: string;
            url: string;
            name: string;
        };
        status: "success" | "failed";
        error: string | null;
        duration: number | null;
        articleCount: number | null;
        createdAt: string;
    } | null>;
    retryJob(jobId: string): Promise<{
        success: boolean;
        message: string;
        articleCount: number;
        duration: number;
    }>;
}
