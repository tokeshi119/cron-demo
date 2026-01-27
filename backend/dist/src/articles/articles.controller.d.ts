import { ArticlesService } from './articles.service';
import { GetArticlesDto } from './dto/get-articles.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(query: GetArticlesDto): Promise<{
        articles: ({
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
