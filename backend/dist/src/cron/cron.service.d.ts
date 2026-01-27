import { PrismaService } from '../prisma/prisma.service';
import { FetchService } from '../fetch/fetch.service';
export declare class CronService {
    private readonly prisma;
    private readonly fetchService;
    private readonly logger;
    private readonly runningJobs;
    constructor(prisma: PrismaService, fetchService: FetchService);
    handleCron(): Promise<void>;
    private fetchSourceSafely;
}
