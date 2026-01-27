import { FetchService } from './fetch.service';
export declare class FetchController {
    private readonly fetchService;
    constructor(fetchService: FetchService);
    fetch(id: string): Promise<{
        success: boolean;
        articleCount: number;
        duration: number;
        message: string;
    }>;
}
