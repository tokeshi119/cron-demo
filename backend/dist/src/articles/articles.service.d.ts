import { PrismaService } from '../prisma/prisma.service';
import { GetArticlesDto } from './dto/get-articles.dto';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
