import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FetchJobModel = runtime.Types.Result.DefaultSelection<Prisma.$FetchJobPayload>;
export type AggregateFetchJob = {
    _count: FetchJobCountAggregateOutputType | null;
    _avg: FetchJobAvgAggregateOutputType | null;
    _sum: FetchJobSumAggregateOutputType | null;
    _min: FetchJobMinAggregateOutputType | null;
    _max: FetchJobMaxAggregateOutputType | null;
};
export type FetchJobAvgAggregateOutputType = {
    duration: number | null;
    articleCount: number | null;
};
export type FetchJobSumAggregateOutputType = {
    duration: number | null;
    articleCount: number | null;
};
export type FetchJobMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    status: string | null;
    error: string | null;
    duration: number | null;
    articleCount: number | null;
    createdAt: Date | null;
};
export type FetchJobMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    status: string | null;
    error: string | null;
    duration: number | null;
    articleCount: number | null;
    createdAt: Date | null;
};
export type FetchJobCountAggregateOutputType = {
    id: number;
    sourceId: number;
    status: number;
    error: number;
    duration: number;
    articleCount: number;
    createdAt: number;
    _all: number;
};
export type FetchJobAvgAggregateInputType = {
    duration?: true;
    articleCount?: true;
};
export type FetchJobSumAggregateInputType = {
    duration?: true;
    articleCount?: true;
};
export type FetchJobMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    error?: true;
    duration?: true;
    articleCount?: true;
    createdAt?: true;
};
export type FetchJobMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    error?: true;
    duration?: true;
    articleCount?: true;
    createdAt?: true;
};
export type FetchJobCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    error?: true;
    duration?: true;
    articleCount?: true;
    createdAt?: true;
    _all?: true;
};
export type FetchJobAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FetchJobWhereInput;
    orderBy?: Prisma.FetchJobOrderByWithRelationInput | Prisma.FetchJobOrderByWithRelationInput[];
    cursor?: Prisma.FetchJobWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FetchJobCountAggregateInputType;
    _avg?: FetchJobAvgAggregateInputType;
    _sum?: FetchJobSumAggregateInputType;
    _min?: FetchJobMinAggregateInputType;
    _max?: FetchJobMaxAggregateInputType;
};
export type GetFetchJobAggregateType<T extends FetchJobAggregateArgs> = {
    [P in keyof T & keyof AggregateFetchJob]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFetchJob[P]> : Prisma.GetScalarType<T[P], AggregateFetchJob[P]>;
};
export type FetchJobGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FetchJobWhereInput;
    orderBy?: Prisma.FetchJobOrderByWithAggregationInput | Prisma.FetchJobOrderByWithAggregationInput[];
    by: Prisma.FetchJobScalarFieldEnum[] | Prisma.FetchJobScalarFieldEnum;
    having?: Prisma.FetchJobScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FetchJobCountAggregateInputType | true;
    _avg?: FetchJobAvgAggregateInputType;
    _sum?: FetchJobSumAggregateInputType;
    _min?: FetchJobMinAggregateInputType;
    _max?: FetchJobMaxAggregateInputType;
};
export type FetchJobGroupByOutputType = {
    id: string;
    sourceId: string;
    status: string;
    error: string | null;
    duration: number | null;
    articleCount: number | null;
    createdAt: Date;
    _count: FetchJobCountAggregateOutputType | null;
    _avg: FetchJobAvgAggregateOutputType | null;
    _sum: FetchJobSumAggregateOutputType | null;
    _min: FetchJobMinAggregateOutputType | null;
    _max: FetchJobMaxAggregateOutputType | null;
};
type GetFetchJobGroupByPayload<T extends FetchJobGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FetchJobGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FetchJobGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FetchJobGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FetchJobGroupByOutputType[P]>;
}>>;
export type FetchJobWhereInput = {
    AND?: Prisma.FetchJobWhereInput | Prisma.FetchJobWhereInput[];
    OR?: Prisma.FetchJobWhereInput[];
    NOT?: Prisma.FetchJobWhereInput | Prisma.FetchJobWhereInput[];
    id?: Prisma.StringFilter<"FetchJob"> | string;
    sourceId?: Prisma.StringFilter<"FetchJob"> | string;
    status?: Prisma.StringFilter<"FetchJob"> | string;
    error?: Prisma.StringNullableFilter<"FetchJob"> | string | null;
    duration?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    articleCount?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FetchJob"> | Date | string;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
};
export type FetchJobOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    articleCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SourceOrderByWithRelationInput;
};
export type FetchJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FetchJobWhereInput | Prisma.FetchJobWhereInput[];
    OR?: Prisma.FetchJobWhereInput[];
    NOT?: Prisma.FetchJobWhereInput | Prisma.FetchJobWhereInput[];
    sourceId?: Prisma.StringFilter<"FetchJob"> | string;
    status?: Prisma.StringFilter<"FetchJob"> | string;
    error?: Prisma.StringNullableFilter<"FetchJob"> | string | null;
    duration?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    articleCount?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FetchJob"> | Date | string;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
}, "id">;
export type FetchJobOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    duration?: Prisma.SortOrderInput | Prisma.SortOrder;
    articleCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FetchJobCountOrderByAggregateInput;
    _avg?: Prisma.FetchJobAvgOrderByAggregateInput;
    _max?: Prisma.FetchJobMaxOrderByAggregateInput;
    _min?: Prisma.FetchJobMinOrderByAggregateInput;
    _sum?: Prisma.FetchJobSumOrderByAggregateInput;
};
export type FetchJobScalarWhereWithAggregatesInput = {
    AND?: Prisma.FetchJobScalarWhereWithAggregatesInput | Prisma.FetchJobScalarWhereWithAggregatesInput[];
    OR?: Prisma.FetchJobScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FetchJobScalarWhereWithAggregatesInput | Prisma.FetchJobScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FetchJob"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"FetchJob"> | string;
    status?: Prisma.StringWithAggregatesFilter<"FetchJob"> | string;
    error?: Prisma.StringNullableWithAggregatesFilter<"FetchJob"> | string | null;
    duration?: Prisma.IntNullableWithAggregatesFilter<"FetchJob"> | number | null;
    articleCount?: Prisma.IntNullableWithAggregatesFilter<"FetchJob"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FetchJob"> | Date | string;
};
export type FetchJobCreateInput = {
    id?: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
    source: Prisma.SourceCreateNestedOneWithoutFetchJobsInput;
};
export type FetchJobUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
};
export type FetchJobUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.SourceUpdateOneRequiredWithoutFetchJobsNestedInput;
};
export type FetchJobUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobCreateManyInput = {
    id?: string;
    sourceId: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
};
export type FetchJobUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobListRelationFilter = {
    every?: Prisma.FetchJobWhereInput;
    some?: Prisma.FetchJobWhereInput;
    none?: Prisma.FetchJobWhereInput;
};
export type FetchJobOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FetchJobCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    articleCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FetchJobAvgOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
    articleCount?: Prisma.SortOrder;
};
export type FetchJobMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    articleCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FetchJobMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    duration?: Prisma.SortOrder;
    articleCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FetchJobSumOrderByAggregateInput = {
    duration?: Prisma.SortOrder;
    articleCount?: Prisma.SortOrder;
};
export type FetchJobCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput> | Prisma.FetchJobCreateWithoutSourceInput[] | Prisma.FetchJobUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FetchJobCreateOrConnectWithoutSourceInput | Prisma.FetchJobCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.FetchJobCreateManySourceInputEnvelope;
    connect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
};
export type FetchJobUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput> | Prisma.FetchJobCreateWithoutSourceInput[] | Prisma.FetchJobUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FetchJobCreateOrConnectWithoutSourceInput | Prisma.FetchJobCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.FetchJobCreateManySourceInputEnvelope;
    connect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
};
export type FetchJobUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput> | Prisma.FetchJobCreateWithoutSourceInput[] | Prisma.FetchJobUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FetchJobCreateOrConnectWithoutSourceInput | Prisma.FetchJobCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.FetchJobUpsertWithWhereUniqueWithoutSourceInput | Prisma.FetchJobUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.FetchJobCreateManySourceInputEnvelope;
    set?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    disconnect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    delete?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    connect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    update?: Prisma.FetchJobUpdateWithWhereUniqueWithoutSourceInput | Prisma.FetchJobUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.FetchJobUpdateManyWithWhereWithoutSourceInput | Prisma.FetchJobUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.FetchJobScalarWhereInput | Prisma.FetchJobScalarWhereInput[];
};
export type FetchJobUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput> | Prisma.FetchJobCreateWithoutSourceInput[] | Prisma.FetchJobUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FetchJobCreateOrConnectWithoutSourceInput | Prisma.FetchJobCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.FetchJobUpsertWithWhereUniqueWithoutSourceInput | Prisma.FetchJobUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.FetchJobCreateManySourceInputEnvelope;
    set?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    disconnect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    delete?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    connect?: Prisma.FetchJobWhereUniqueInput | Prisma.FetchJobWhereUniqueInput[];
    update?: Prisma.FetchJobUpdateWithWhereUniqueWithoutSourceInput | Prisma.FetchJobUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.FetchJobUpdateManyWithWhereWithoutSourceInput | Prisma.FetchJobUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.FetchJobScalarWhereInput | Prisma.FetchJobScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FetchJobCreateWithoutSourceInput = {
    id?: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
};
export type FetchJobUncheckedCreateWithoutSourceInput = {
    id?: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
};
export type FetchJobCreateOrConnectWithoutSourceInput = {
    where: Prisma.FetchJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput>;
};
export type FetchJobCreateManySourceInputEnvelope = {
    data: Prisma.FetchJobCreateManySourceInput | Prisma.FetchJobCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type FetchJobUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.FetchJobWhereUniqueInput;
    update: Prisma.XOR<Prisma.FetchJobUpdateWithoutSourceInput, Prisma.FetchJobUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.FetchJobCreateWithoutSourceInput, Prisma.FetchJobUncheckedCreateWithoutSourceInput>;
};
export type FetchJobUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.FetchJobWhereUniqueInput;
    data: Prisma.XOR<Prisma.FetchJobUpdateWithoutSourceInput, Prisma.FetchJobUncheckedUpdateWithoutSourceInput>;
};
export type FetchJobUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.FetchJobScalarWhereInput;
    data: Prisma.XOR<Prisma.FetchJobUpdateManyMutationInput, Prisma.FetchJobUncheckedUpdateManyWithoutSourceInput>;
};
export type FetchJobScalarWhereInput = {
    AND?: Prisma.FetchJobScalarWhereInput | Prisma.FetchJobScalarWhereInput[];
    OR?: Prisma.FetchJobScalarWhereInput[];
    NOT?: Prisma.FetchJobScalarWhereInput | Prisma.FetchJobScalarWhereInput[];
    id?: Prisma.StringFilter<"FetchJob"> | string;
    sourceId?: Prisma.StringFilter<"FetchJob"> | string;
    status?: Prisma.StringFilter<"FetchJob"> | string;
    error?: Prisma.StringNullableFilter<"FetchJob"> | string | null;
    duration?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    articleCount?: Prisma.IntNullableFilter<"FetchJob"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FetchJob"> | Date | string;
};
export type FetchJobCreateManySourceInput = {
    id?: string;
    status: string;
    error?: string | null;
    duration?: number | null;
    articleCount?: number | null;
    createdAt?: Date | string;
};
export type FetchJobUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duration?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    articleCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FetchJobSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    error?: boolean;
    duration?: boolean;
    articleCount?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fetchJob"]>;
export type FetchJobSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    error?: boolean;
    duration?: boolean;
    articleCount?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fetchJob"]>;
export type FetchJobSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    error?: boolean;
    duration?: boolean;
    articleCount?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fetchJob"]>;
export type FetchJobSelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    error?: boolean;
    duration?: boolean;
    articleCount?: boolean;
    createdAt?: boolean;
};
export type FetchJobOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceId" | "status" | "error" | "duration" | "articleCount" | "createdAt", ExtArgs["result"]["fetchJob"]>;
export type FetchJobInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type FetchJobIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type FetchJobIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type $FetchJobPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FetchJob";
    objects: {
        source: Prisma.$SourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceId: string;
        status: string;
        error: string | null;
        duration: number | null;
        articleCount: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["fetchJob"]>;
    composites: {};
};
export type FetchJobGetPayload<S extends boolean | null | undefined | FetchJobDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FetchJobPayload, S>;
export type FetchJobCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FetchJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FetchJobCountAggregateInputType | true;
};
export interface FetchJobDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FetchJob'];
        meta: {
            name: 'FetchJob';
        };
    };
    findUnique<T extends FetchJobFindUniqueArgs>(args: Prisma.SelectSubset<T, FetchJobFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FetchJobFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FetchJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FetchJobFindFirstArgs>(args?: Prisma.SelectSubset<T, FetchJobFindFirstArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FetchJobFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FetchJobFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FetchJobFindManyArgs>(args?: Prisma.SelectSubset<T, FetchJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FetchJobCreateArgs>(args: Prisma.SelectSubset<T, FetchJobCreateArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FetchJobCreateManyArgs>(args?: Prisma.SelectSubset<T, FetchJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FetchJobCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FetchJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FetchJobDeleteArgs>(args: Prisma.SelectSubset<T, FetchJobDeleteArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FetchJobUpdateArgs>(args: Prisma.SelectSubset<T, FetchJobUpdateArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FetchJobDeleteManyArgs>(args?: Prisma.SelectSubset<T, FetchJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FetchJobUpdateManyArgs>(args: Prisma.SelectSubset<T, FetchJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FetchJobUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FetchJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FetchJobUpsertArgs>(args: Prisma.SelectSubset<T, FetchJobUpsertArgs<ExtArgs>>): Prisma.Prisma__FetchJobClient<runtime.Types.Result.GetResult<Prisma.$FetchJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FetchJobCountArgs>(args?: Prisma.Subset<T, FetchJobCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FetchJobCountAggregateOutputType> : number>;
    aggregate<T extends FetchJobAggregateArgs>(args: Prisma.Subset<T, FetchJobAggregateArgs>): Prisma.PrismaPromise<GetFetchJobAggregateType<T>>;
    groupBy<T extends FetchJobGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FetchJobGroupByArgs['orderBy'];
    } : {
        orderBy?: FetchJobGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FetchJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFetchJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FetchJobFieldRefs;
}
export interface Prisma__FetchJobClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    source<T extends Prisma.SourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SourceDefaultArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FetchJobFieldRefs {
    readonly id: Prisma.FieldRef<"FetchJob", 'String'>;
    readonly sourceId: Prisma.FieldRef<"FetchJob", 'String'>;
    readonly status: Prisma.FieldRef<"FetchJob", 'String'>;
    readonly error: Prisma.FieldRef<"FetchJob", 'String'>;
    readonly duration: Prisma.FieldRef<"FetchJob", 'Int'>;
    readonly articleCount: Prisma.FieldRef<"FetchJob", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"FetchJob", 'DateTime'>;
}
export type FetchJobFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    where: Prisma.FetchJobWhereUniqueInput;
};
export type FetchJobFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    where: Prisma.FetchJobWhereUniqueInput;
};
export type FetchJobFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FetchJobFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FetchJobFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FetchJobCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FetchJobCreateInput, Prisma.FetchJobUncheckedCreateInput>;
};
export type FetchJobCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FetchJobCreateManyInput | Prisma.FetchJobCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FetchJobCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    data: Prisma.FetchJobCreateManyInput | Prisma.FetchJobCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FetchJobIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FetchJobUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FetchJobUpdateInput, Prisma.FetchJobUncheckedUpdateInput>;
    where: Prisma.FetchJobWhereUniqueInput;
};
export type FetchJobUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FetchJobUpdateManyMutationInput, Prisma.FetchJobUncheckedUpdateManyInput>;
    where?: Prisma.FetchJobWhereInput;
    limit?: number;
};
export type FetchJobUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FetchJobUpdateManyMutationInput, Prisma.FetchJobUncheckedUpdateManyInput>;
    where?: Prisma.FetchJobWhereInput;
    limit?: number;
    include?: Prisma.FetchJobIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FetchJobUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    where: Prisma.FetchJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.FetchJobCreateInput, Prisma.FetchJobUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FetchJobUpdateInput, Prisma.FetchJobUncheckedUpdateInput>;
};
export type FetchJobDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
    where: Prisma.FetchJobWhereUniqueInput;
};
export type FetchJobDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FetchJobWhereInput;
    limit?: number;
};
export type FetchJobDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FetchJobSelect<ExtArgs> | null;
    omit?: Prisma.FetchJobOmit<ExtArgs> | null;
    include?: Prisma.FetchJobInclude<ExtArgs> | null;
};
export {};
