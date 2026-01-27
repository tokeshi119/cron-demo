import { PrismaService } from '../prisma/prisma.service';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
