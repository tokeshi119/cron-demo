import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(): Promise<({
        source: {
            url: string;
            name: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sourceId: string;
        publishedAt: Date | null;
    })[]>;
}
