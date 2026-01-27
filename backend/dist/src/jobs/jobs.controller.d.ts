import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(sourceId?: string, status?: 'success' | 'failed', page?: number, limit?: number): Promise<import("./jobs.service").JobsResponse>;
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
    }>;
    retryJob(id: string): Promise<{
        success: boolean;
        message: string;
        articleCount: number;
        duration: number;
    }>;
}
