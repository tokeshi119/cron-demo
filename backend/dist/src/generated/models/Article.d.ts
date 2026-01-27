import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ArticleModel = runtime.Types.Result.DefaultSelection<Prisma.$ArticlePayload>;
export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null;
    _min: ArticleMinAggregateOutputType | null;
    _max: ArticleMaxAggregateOutputType | null;
};
export type ArticleMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    url: string | null;
    title: string | null;
    description: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ArticleMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    url: string | null;
    title: string | null;
    description: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ArticleCountAggregateOutputType = {
    id: number;
    sourceId: number;
    url: number;
    title: number;
    description: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ArticleMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    url?: true;
    title?: true;
    description?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ArticleMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    url?: true;
    title?: true;
    description?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ArticleCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    url?: true;
    title?: true;
    description?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ArticleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput | Prisma.ArticleOrderByWithRelationInput[];
    cursor?: Prisma.ArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ArticleCountAggregateInputType;
    _min?: ArticleMinAggregateInputType;
    _max?: ArticleMaxAggregateInputType;
};
export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
    [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateArticle[P]> : Prisma.GetScalarType<T[P], AggregateArticle[P]>;
};
export type ArticleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithAggregationInput | Prisma.ArticleOrderByWithAggregationInput[];
    by: Prisma.ArticleScalarFieldEnum[] | Prisma.ArticleScalarFieldEnum;
    having?: Prisma.ArticleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ArticleCountAggregateInputType | true;
    _min?: ArticleMinAggregateInputType;
    _max?: ArticleMaxAggregateInputType;
};
export type ArticleGroupByOutputType = {
    id: string;
    sourceId: string;
    url: string;
    title: string;
    description: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ArticleCountAggregateOutputType | null;
    _min: ArticleMinAggregateOutputType | null;
    _max: ArticleMaxAggregateOutputType | null;
};
type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ArticleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ArticleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ArticleGroupByOutputType[P]>;
}>>;
export type ArticleWhereInput = {
    AND?: Prisma.ArticleWhereInput | Prisma.ArticleWhereInput[];
    OR?: Prisma.ArticleWhereInput[];
    NOT?: Prisma.ArticleWhereInput | Prisma.ArticleWhereInput[];
    id?: Prisma.StringFilter<"Article"> | string;
    sourceId?: Prisma.StringFilter<"Article"> | string;
    url?: Prisma.StringFilter<"Article"> | string;
    title?: Prisma.StringFilter<"Article"> | string;
    description?: Prisma.StringNullableFilter<"Article"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"Article"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
};
export type ArticleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    source?: Prisma.SourceOrderByWithRelationInput;
};
export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    url?: string;
    AND?: Prisma.ArticleWhereInput | Prisma.ArticleWhereInput[];
    OR?: Prisma.ArticleWhereInput[];
    NOT?: Prisma.ArticleWhereInput | Prisma.ArticleWhereInput[];
    sourceId?: Prisma.StringFilter<"Article"> | string;
    title?: Prisma.StringFilter<"Article"> | string;
    description?: Prisma.StringNullableFilter<"Article"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"Article"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
}, "id" | "url">;
export type ArticleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ArticleCountOrderByAggregateInput;
    _max?: Prisma.ArticleMaxOrderByAggregateInput;
    _min?: Prisma.ArticleMinOrderByAggregateInput;
};
export type ArticleScalarWhereWithAggregatesInput = {
    AND?: Prisma.ArticleScalarWhereWithAggregatesInput | Prisma.ArticleScalarWhereWithAggregatesInput[];
    OR?: Prisma.ArticleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ArticleScalarWhereWithAggregatesInput | Prisma.ArticleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Article"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"Article"> | string;
    url?: Prisma.StringWithAggregatesFilter<"Article"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Article"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Article"> | string | null;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Article"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Article"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Article"> | Date | string;
};
export type ArticleCreateInput = {
    id?: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    source: Prisma.SourceCreateNestedOneWithoutArticlesInput;
};
export type ArticleUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ArticleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.SourceUpdateOneRequiredWithoutArticlesNestedInput;
};
export type ArticleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleCreateManyInput = {
    id?: string;
    sourceId: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ArticleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleListRelationFilter = {
    every?: Prisma.ArticleWhereInput;
    some?: Prisma.ArticleWhereInput;
    none?: Prisma.ArticleWhereInput;
};
export type ArticleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ArticleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ArticleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ArticleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ArticleCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput> | Prisma.ArticleCreateWithoutSourceInput[] | Prisma.ArticleUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.ArticleCreateOrConnectWithoutSourceInput | Prisma.ArticleCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.ArticleCreateManySourceInputEnvelope;
    connect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
};
export type ArticleUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput> | Prisma.ArticleCreateWithoutSourceInput[] | Prisma.ArticleUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.ArticleCreateOrConnectWithoutSourceInput | Prisma.ArticleCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.ArticleCreateManySourceInputEnvelope;
    connect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
};
export type ArticleUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput> | Prisma.ArticleCreateWithoutSourceInput[] | Prisma.ArticleUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.ArticleCreateOrConnectWithoutSourceInput | Prisma.ArticleCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.ArticleUpsertWithWhereUniqueWithoutSourceInput | Prisma.ArticleUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.ArticleCreateManySourceInputEnvelope;
    set?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    disconnect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    delete?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    connect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    update?: Prisma.ArticleUpdateWithWhereUniqueWithoutSourceInput | Prisma.ArticleUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.ArticleUpdateManyWithWhereWithoutSourceInput | Prisma.ArticleUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.ArticleScalarWhereInput | Prisma.ArticleScalarWhereInput[];
};
export type ArticleUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput> | Prisma.ArticleCreateWithoutSourceInput[] | Prisma.ArticleUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.ArticleCreateOrConnectWithoutSourceInput | Prisma.ArticleCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.ArticleUpsertWithWhereUniqueWithoutSourceInput | Prisma.ArticleUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.ArticleCreateManySourceInputEnvelope;
    set?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    disconnect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    delete?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    connect?: Prisma.ArticleWhereUniqueInput | Prisma.ArticleWhereUniqueInput[];
    update?: Prisma.ArticleUpdateWithWhereUniqueWithoutSourceInput | Prisma.ArticleUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.ArticleUpdateManyWithWhereWithoutSourceInput | Prisma.ArticleUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.ArticleScalarWhereInput | Prisma.ArticleScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ArticleCreateWithoutSourceInput = {
    id?: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ArticleUncheckedCreateWithoutSourceInput = {
    id?: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ArticleCreateOrConnectWithoutSourceInput = {
    where: Prisma.ArticleWhereUniqueInput;
    create: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput>;
};
export type ArticleCreateManySourceInputEnvelope = {
    data: Prisma.ArticleCreateManySourceInput | Prisma.ArticleCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type ArticleUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.ArticleWhereUniqueInput;
    update: Prisma.XOR<Prisma.ArticleUpdateWithoutSourceInput, Prisma.ArticleUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.ArticleCreateWithoutSourceInput, Prisma.ArticleUncheckedCreateWithoutSourceInput>;
};
export type ArticleUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.ArticleWhereUniqueInput;
    data: Prisma.XOR<Prisma.ArticleUpdateWithoutSourceInput, Prisma.ArticleUncheckedUpdateWithoutSourceInput>;
};
export type ArticleUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.ArticleScalarWhereInput;
    data: Prisma.XOR<Prisma.ArticleUpdateManyMutationInput, Prisma.ArticleUncheckedUpdateManyWithoutSourceInput>;
};
export type ArticleScalarWhereInput = {
    AND?: Prisma.ArticleScalarWhereInput | Prisma.ArticleScalarWhereInput[];
    OR?: Prisma.ArticleScalarWhereInput[];
    NOT?: Prisma.ArticleScalarWhereInput | Prisma.ArticleScalarWhereInput[];
    id?: Prisma.StringFilter<"Article"> | string;
    sourceId?: Prisma.StringFilter<"Article"> | string;
    url?: Prisma.StringFilter<"Article"> | string;
    title?: Prisma.StringFilter<"Article"> | string;
    description?: Prisma.StringNullableFilter<"Article"> | string | null;
    publishedAt?: Prisma.DateTimeNullableFilter<"Article"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Article"> | Date | string;
};
export type ArticleCreateManySourceInput = {
    id?: string;
    url: string;
    title: string;
    description?: string | null;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ArticleUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ArticleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    url?: boolean;
    title?: boolean;
    description?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["article"]>;
export type ArticleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    url?: boolean;
    title?: boolean;
    description?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["article"]>;
export type ArticleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    url?: boolean;
    title?: boolean;
    description?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["article"]>;
export type ArticleSelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    url?: boolean;
    title?: boolean;
    description?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ArticleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceId" | "url" | "title" | "description" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>;
export type ArticleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type ArticleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type $ArticlePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Article";
    objects: {
        source: Prisma.$SourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceId: string;
        url: string;
        title: string;
        description: string | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["article"]>;
    composites: {};
};
export type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ArticlePayload, S>;
export type ArticleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ArticleCountAggregateInputType | true;
};
export interface ArticleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Article'];
        meta: {
            name: 'Article';
        };
    };
    findUnique<T extends ArticleFindUniqueArgs>(args: Prisma.SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ArticleFindFirstArgs>(args?: Prisma.SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ArticleFindManyArgs>(args?: Prisma.SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ArticleCreateArgs>(args: Prisma.SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ArticleCreateManyArgs>(args?: Prisma.SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ArticleDeleteArgs>(args: Prisma.SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ArticleUpdateArgs>(args: Prisma.SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ArticleDeleteManyArgs>(args?: Prisma.SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ArticleUpdateManyArgs>(args: Prisma.SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ArticleUpsertArgs>(args: Prisma.SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma.Prisma__ArticleClient<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ArticleCountArgs>(args?: Prisma.Subset<T, ArticleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ArticleCountAggregateOutputType> : number>;
    aggregate<T extends ArticleAggregateArgs>(args: Prisma.Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>;
    groupBy<T extends ArticleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ArticleGroupByArgs['orderBy'];
    } : {
        orderBy?: ArticleGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ArticleFieldRefs;
}
export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    source<T extends Prisma.SourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SourceDefaultArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ArticleFieldRefs {
    readonly id: Prisma.FieldRef<"Article", 'String'>;
    readonly sourceId: Prisma.FieldRef<"Article", 'String'>;
    readonly url: Prisma.FieldRef<"Article", 'String'>;
    readonly title: Prisma.FieldRef<"Article", 'String'>;
    readonly description: Prisma.FieldRef<"Article", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"Article", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Article", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Article", 'DateTime'>;
}
export type ArticleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where: Prisma.ArticleWhereUniqueInput;
};
export type ArticleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where: Prisma.ArticleWhereUniqueInput;
};
export type ArticleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput | Prisma.ArticleOrderByWithRelationInput[];
    cursor?: Prisma.ArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArticleScalarFieldEnum | Prisma.ArticleScalarFieldEnum[];
};
export type ArticleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput | Prisma.ArticleOrderByWithRelationInput[];
    cursor?: Prisma.ArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArticleScalarFieldEnum | Prisma.ArticleScalarFieldEnum[];
};
export type ArticleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput | Prisma.ArticleOrderByWithRelationInput[];
    cursor?: Prisma.ArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ArticleScalarFieldEnum | Prisma.ArticleScalarFieldEnum[];
};
export type ArticleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArticleCreateInput, Prisma.ArticleUncheckedCreateInput>;
};
export type ArticleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ArticleCreateManyInput | Prisma.ArticleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ArticleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    data: Prisma.ArticleCreateManyInput | Prisma.ArticleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ArticleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ArticleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArticleUpdateInput, Prisma.ArticleUncheckedUpdateInput>;
    where: Prisma.ArticleWhereUniqueInput;
};
export type ArticleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ArticleUpdateManyMutationInput, Prisma.ArticleUncheckedUpdateManyInput>;
    where?: Prisma.ArticleWhereInput;
    limit?: number;
};
export type ArticleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ArticleUpdateManyMutationInput, Prisma.ArticleUncheckedUpdateManyInput>;
    where?: Prisma.ArticleWhereInput;
    limit?: number;
    include?: Prisma.ArticleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ArticleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where: Prisma.ArticleWhereUniqueInput;
    create: Prisma.XOR<Prisma.ArticleCreateInput, Prisma.ArticleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ArticleUpdateInput, Prisma.ArticleUncheckedUpdateInput>;
};
export type ArticleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
    where: Prisma.ArticleWhereUniqueInput;
};
export type ArticleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArticleWhereInput;
    limit?: number;
};
export type ArticleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ArticleSelect<ExtArgs> | null;
    omit?: Prisma.ArticleOmit<ExtArgs> | null;
    include?: Prisma.ArticleInclude<ExtArgs> | null;
};
export {};
