export declare class GetArticlesDto {
    query?: string;
    sourceId?: string;
    sort?: 'createdAt' | 'publishedAt' | 'title';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
