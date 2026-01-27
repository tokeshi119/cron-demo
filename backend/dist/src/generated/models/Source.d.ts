import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SourceModel = runtime.Types.Result.DefaultSelection<Prisma.$SourcePayload>;
export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null;
    _min: SourceMinAggregateOutputType | null;
    _max: SourceMaxAggregateOutputType | null;
};
export type SourceMinAggregateOutputType = {
    id: string | null;
    url: string | null;
    name: string | null;
    enabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SourceMaxAggregateOutputType = {
    id: string | null;
    url: string | null;
    name: string | null;
    enabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SourceCountAggregateOutputType = {
    id: number;
    url: number;
    name: number;
    enabled: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SourceMinAggregateInputType = {
    id?: true;
    url?: true;
    name?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SourceMaxAggregateInputType = {
    id?: true;
    url?: true;
    name?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SourceCountAggregateInputType = {
    id?: true;
    url?: true;
    name?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SourceWhereInput;
    orderBy?: Prisma.SourceOrderByWithRelationInput | Prisma.SourceOrderByWithRelationInput[];
    cursor?: Prisma.SourceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SourceCountAggregateInputType;
    _min?: SourceMinAggregateInputType;
    _max?: SourceMaxAggregateInputType;
};
export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
    [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSource[P]> : Prisma.GetScalarType<T[P], AggregateSource[P]>;
};
export type SourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SourceWhereInput;
    orderBy?: Prisma.SourceOrderByWithAggregationInput | Prisma.SourceOrderByWithAggregationInput[];
    by: Prisma.SourceScalarFieldEnum[] | Prisma.SourceScalarFieldEnum;
    having?: Prisma.SourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SourceCountAggregateInputType | true;
    _min?: SourceMinAggregateInputType;
    _max?: SourceMaxAggregateInputType;
};
export type SourceGroupByOutputType = {
    id: string;
    url: string;
    name: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: SourceCountAggregateOutputType | null;
    _min: SourceMinAggregateOutputType | null;
    _max: SourceMaxAggregateOutputType | null;
};
type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SourceGroupByOutputType[P]>;
}>>;
export type SourceWhereInput = {
    AND?: Prisma.SourceWhereInput | Prisma.SourceWhereInput[];
    OR?: Prisma.SourceWhereInput[];
    NOT?: Prisma.SourceWhereInput | Prisma.SourceWhereInput[];
    id?: Prisma.StringFilter<"Source"> | string;
    url?: Prisma.StringFilter<"Source"> | string;
    name?: Prisma.StringFilter<"Source"> | string;
    enabled?: Prisma.BoolFilter<"Source"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Source"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Source"> | Date | string;
    articles?: Prisma.ArticleListRelationFilter;
    fetchJobs?: Prisma.FetchJobListRelationFilter;
};
export type SourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    articles?: Prisma.ArticleOrderByRelationAggregateInput;
    fetchJobs?: Prisma.FetchJobOrderByRelationAggregateInput;
};
export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    url?: string;
    AND?: Prisma.SourceWhereInput | Prisma.SourceWhereInput[];
    OR?: Prisma.SourceWhereInput[];
    NOT?: Prisma.SourceWhereInput | Prisma.SourceWhereInput[];
    name?: Prisma.StringFilter<"Source"> | string;
    enabled?: Prisma.BoolFilter<"Source"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Source"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Source"> | Date | string;
    articles?: Prisma.ArticleListRelationFilter;
    fetchJobs?: Prisma.FetchJobListRelationFilter;
}, "id" | "url">;
export type SourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SourceCountOrderByAggregateInput;
    _max?: Prisma.SourceMaxOrderByAggregateInput;
    _min?: Prisma.SourceMinOrderByAggregateInput;
};
export type SourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.SourceScalarWhereWithAggregatesInput | Prisma.SourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.SourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SourceScalarWhereWithAggregatesInput | Prisma.SourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Source"> | string;
    url?: Prisma.StringWithAggregatesFilter<"Source"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Source"> | string;
    enabled?: Prisma.BoolWithAggregatesFilter<"Source"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Source"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Source"> | Date | string;
};
export type SourceCreateInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    articles?: Prisma.ArticleCreateNestedManyWithoutSourceInput;
    fetchJobs?: Prisma.FetchJobCreateNestedManyWithoutSourceInput;
};
export type SourceUncheckedCreateInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    articles?: Prisma.ArticleUncheckedCreateNestedManyWithoutSourceInput;
    fetchJobs?: Prisma.FetchJobUncheckedCreateNestedManyWithoutSourceInput;
};
export type SourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    articles?: Prisma.ArticleUpdateManyWithoutSourceNestedInput;
    fetchJobs?: Prisma.FetchJobUpdateManyWithoutSourceNestedInput;
};
export type SourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    articles?: Prisma.ArticleUncheckedUpdateManyWithoutSourceNestedInput;
    fetchJobs?: Prisma.FetchJobUncheckedUpdateManyWithoutSourceNestedInput;
};
export type SourceCreateManyInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SourceScalarRelationFilter = {
    is?: Prisma.SourceWhereInput;
    isNot?: Prisma.SourceWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type SourceCreateNestedOneWithoutArticlesInput = {
    create?: Prisma.XOR<Prisma.SourceCreateWithoutArticlesInput, Prisma.SourceUncheckedCreateWithoutArticlesInput>;
    connectOrCreate?: Prisma.SourceCreateOrConnectWithoutArticlesInput;
    connect?: Prisma.SourceWhereUniqueInput;
};
export type SourceUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: Prisma.XOR<Prisma.SourceCreateWithoutArticlesInput, Prisma.SourceUncheckedCreateWithoutArticlesInput>;
    connectOrCreate?: Prisma.SourceCreateOrConnectWithoutArticlesInput;
    upsert?: Prisma.SourceUpsertWithoutArticlesInput;
    connect?: Prisma.SourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SourceUpdateToOneWithWhereWithoutArticlesInput, Prisma.SourceUpdateWithoutArticlesInput>, Prisma.SourceUncheckedUpdateWithoutArticlesInput>;
};
export type SourceCreateNestedOneWithoutFetchJobsInput = {
    create?: Prisma.XOR<Prisma.SourceCreateWithoutFetchJobsInput, Prisma.SourceUncheckedCreateWithoutFetchJobsInput>;
    connectOrCreate?: Prisma.SourceCreateOrConnectWithoutFetchJobsInput;
    connect?: Prisma.SourceWhereUniqueInput;
};
export type SourceUpdateOneRequiredWithoutFetchJobsNestedInput = {
    create?: Prisma.XOR<Prisma.SourceCreateWithoutFetchJobsInput, Prisma.SourceUncheckedCreateWithoutFetchJobsInput>;
    connectOrCreate?: Prisma.SourceCreateOrConnectWithoutFetchJobsInput;
    upsert?: Prisma.SourceUpsertWithoutFetchJobsInput;
    connect?: Prisma.SourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SourceUpdateToOneWithWhereWithoutFetchJobsInput, Prisma.SourceUpdateWithoutFetchJobsInput>, Prisma.SourceUncheckedUpdateWithoutFetchJobsInput>;
};
export type SourceCreateWithoutArticlesInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fetchJobs?: Prisma.FetchJobCreateNestedManyWithoutSourceInput;
};
export type SourceUncheckedCreateWithoutArticlesInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fetchJobs?: Prisma.FetchJobUncheckedCreateNestedManyWithoutSourceInput;
};
export type SourceCreateOrConnectWithoutArticlesInput = {
    where: Prisma.SourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.SourceCreateWithoutArticlesInput, Prisma.SourceUncheckedCreateWithoutArticlesInput>;
};
export type SourceUpsertWithoutArticlesInput = {
    update: Prisma.XOR<Prisma.SourceUpdateWithoutArticlesInput, Prisma.SourceUncheckedUpdateWithoutArticlesInput>;
    create: Prisma.XOR<Prisma.SourceCreateWithoutArticlesInput, Prisma.SourceUncheckedCreateWithoutArticlesInput>;
    where?: Prisma.SourceWhereInput;
};
export type SourceUpdateToOneWithWhereWithoutArticlesInput = {
    where?: Prisma.SourceWhereInput;
    data: Prisma.XOR<Prisma.SourceUpdateWithoutArticlesInput, Prisma.SourceUncheckedUpdateWithoutArticlesInput>;
};
export type SourceUpdateWithoutArticlesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fetchJobs?: Prisma.FetchJobUpdateManyWithoutSourceNestedInput;
};
export type SourceUncheckedUpdateWithoutArticlesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fetchJobs?: Prisma.FetchJobUncheckedUpdateManyWithoutSourceNestedInput;
};
export type SourceCreateWithoutFetchJobsInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    articles?: Prisma.ArticleCreateNestedManyWithoutSourceInput;
};
export type SourceUncheckedCreateWithoutFetchJobsInput = {
    id?: string;
    url: string;
    name: string;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    articles?: Prisma.ArticleUncheckedCreateNestedManyWithoutSourceInput;
};
export type SourceCreateOrConnectWithoutFetchJobsInput = {
    where: Prisma.SourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.SourceCreateWithoutFetchJobsInput, Prisma.SourceUncheckedCreateWithoutFetchJobsInput>;
};
export type SourceUpsertWithoutFetchJobsInput = {
    update: Prisma.XOR<Prisma.SourceUpdateWithoutFetchJobsInput, Prisma.SourceUncheckedUpdateWithoutFetchJobsInput>;
    create: Prisma.XOR<Prisma.SourceCreateWithoutFetchJobsInput, Prisma.SourceUncheckedCreateWithoutFetchJobsInput>;
    where?: Prisma.SourceWhereInput;
};
export type SourceUpdateToOneWithWhereWithoutFetchJobsInput = {
    where?: Prisma.SourceWhereInput;
    data: Prisma.XOR<Prisma.SourceUpdateWithoutFetchJobsInput, Prisma.SourceUncheckedUpdateWithoutFetchJobsInput>;
};
export type SourceUpdateWithoutFetchJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    articles?: Prisma.ArticleUpdateManyWithoutSourceNestedInput;
};
export type SourceUncheckedUpdateWithoutFetchJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    articles?: Prisma.ArticleUncheckedUpdateManyWithoutSourceNestedInput;
};
export type SourceCountOutputType = {
    articles: number;
    fetchJobs: number;
};
export type SourceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    articles?: boolean | SourceCountOutputTypeCountArticlesArgs;
    fetchJobs?: boolean | SourceCountOutputTypeCountFetchJobsArgs;
};
export type SourceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceCountOutputTypeSelect<ExtArgs> | null;
};
export type SourceCountOutputTypeCountArticlesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ArticleWhereInput;
};
export type SourceCountOutputTypeCountFetchJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FetchJobWhereInput;
};
export type SourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    name?: boolean;
    enabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    articles?: boolean | Prisma.Source$articlesArgs<ExtArgs>;
    fetchJobs?: boolean | Prisma.Source$fetchJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.SourceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["source"]>;
export type SourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    name?: boolean;
    enabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["source"]>;
export type SourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    name?: boolean;
    enabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["source"]>;
export type SourceSelectScalar = {
    id?: boolean;
    url?: boolean;
    name?: boolean;
    enabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "url" | "name" | "enabled" | "createdAt" | "updatedAt", ExtArgs["result"]["source"]>;
export type SourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    articles?: boolean | Prisma.Source$articlesArgs<ExtArgs>;
    fetchJobs?: boolean | Prisma.Source$fetchJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.SourceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type SourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $SourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Source";
    objects: {
        articles: Prisma.$ArticlePayload<ExtArgs>[];
        fetchJobs: Prisma.$FetchJobPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        url: string;
        name: string;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["source"]>;
    composites: {};
};
export type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SourcePayload, S>;
export type SourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SourceCountAggregateInputType | true;
};
export interface SourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Source'];
        meta: {
            name: 'Source';
        };
    };
    findUnique<T extends SourceFindUniqueArgs>(args: Prisma.SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SourceFindFirstArgs>(args?: Prisma.SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SourceFindManyArgs>(args?: Prisma.SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SourceCreateArgs>(args: Prisma.SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SourceCreateManyArgs>(args?: Prisma.SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SourceDeleteArgs>(args: Prisma.SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SourceUpdateArgs>(args: Prisma.SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SourceUpdateManyArgs>(args: Prisma.SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SourceUpsertArgs>(args: Prisma.SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SourceCountArgs>(args?: Prisma.Subset<T, SourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SourceCountAggregateOutputType> : number>;
    aggregate<T extends SourceAggregateArgs>(args: Prisma.Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>;
    groupBy<T extends SourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SourceGroupByArgs['orderBy'];
    } : {
        orderBy?: SourceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SourceFieldRefs;
}
export interface Prisma__SourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    articles<T extends Prisma.Source$articlesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Source$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    fetchJobs<T extends Prisma.Source$fetchJobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Source$fetchJobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SourceFieldRefs {
    readonly id: Prisma.FieldRef<"Source", 'String'>;
    readonly url: Prisma.FieldRef<"Source", 'String'>;
    readonly name: Prisma.FieldRef<"Source", 'String'>;
    readonly enabled: Prisma.FieldRef<"Source", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Source", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Source", 'DateTime'>;
}
export type SourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where: Prisma.SourceWhereUniqueInput;
};
export type SourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where: Prisma.SourceWhereUniqueInput;
};
export type SourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where?: Prisma.SourceWhereInput;
    orderBy?: Prisma.SourceOrderByWithRelationInput | Prisma.SourceOrderByWithRelationInput[];
    cursor?: Prisma.SourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SourceScalarFieldEnum | Prisma.SourceScalarFieldEnum[];
};
export type SourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where?: Prisma.SourceWhereInput;
    orderBy?: Prisma.SourceOrderByWithRelationInput | Prisma.SourceOrderByWithRelationInput[];
    cursor?: Prisma.SourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SourceScalarFieldEnum | Prisma.SourceScalarFieldEnum[];
};
export type SourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where?: Prisma.SourceWhereInput;
    orderBy?: Prisma.SourceOrderByWithRelationInput | Prisma.SourceOrderByWithRelationInput[];
    cursor?: Prisma.SourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SourceScalarFieldEnum | Prisma.SourceScalarFieldEnum[];
};
export type SourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SourceCreateInput, Prisma.SourceUncheckedCreateInput>;
};
export type SourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SourceCreateManyInput | Prisma.SourceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    data: Prisma.SourceCreateManyInput | Prisma.SourceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SourceUpdateInput, Prisma.SourceUncheckedUpdateInput>;
    where: Prisma.SourceWhereUniqueInput;
};
export type SourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SourceUpdateManyMutationInput, Prisma.SourceUncheckedUpdateManyInput>;
    where?: Prisma.SourceWhereInput;
    limit?: number;
};
export type SourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SourceUpdateManyMutationInput, Prisma.SourceUncheckedUpdateManyInput>;
    where?: Prisma.SourceWhereInput;
    limit?: number;
};
export type SourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where: Prisma.SourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.SourceCreateInput, Prisma.SourceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SourceUpdateInput, Prisma.SourceUncheckedUpdateInput>;
};
export type SourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
    where: Prisma.SourceWhereUniqueInput;
};
export type SourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SourceWhereInput;
    limit?: number;
};
export type Source$articlesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Source$fetchJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    where?: Prisma.FetchJobWhereInput;
    orderBy?: Prisma.FetchJobOrderByWithRelationInput | Prisma.FetchJobOrderByWithRelationInput[];
    cursor?: Prisma.FetchJobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FetchJobScalarFieldEnum | Prisma.FetchJobScalarFieldEnum[];
};
export type SourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SourceSelect<ExtArgs> | null;
    omit?: Prisma.SourceOmit<ExtArgs> | null;
    include?: Prisma.SourceInclude<ExtArgs> | null;
};
export {};
