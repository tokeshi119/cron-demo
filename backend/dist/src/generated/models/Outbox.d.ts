import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OutboxModel = runtime.Types.Result.DefaultSelection<Prisma.$OutboxPayload>;
export type AggregateOutbox = {
    _count: OutboxCountAggregateOutputType | null;
    _avg: OutboxAvgAggregateOutputType | null;
    _sum: OutboxSumAggregateOutputType | null;
    _min: OutboxMinAggregateOutputType | null;
    _max: OutboxMaxAggregateOutputType | null;
};
export type OutboxAvgAggregateOutputType = {
    retryCount: number | null;
};
export type OutboxSumAggregateOutputType = {
    retryCount: number | null;
};
export type OutboxMinAggregateOutputType = {
    id: string | null;
    type: string | null;
    status: string | null;
    retryCount: number | null;
    error: string | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutboxMaxAggregateOutputType = {
    id: string | null;
    type: string | null;
    status: string | null;
    retryCount: number | null;
    error: string | null;
    processedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutboxCountAggregateOutputType = {
    id: number;
    type: number;
    payload: number;
    status: number;
    retryCount: number;
    error: number;
    processedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OutboxAvgAggregateInputType = {
    retryCount?: true;
};
export type OutboxSumAggregateInputType = {
    retryCount?: true;
};
export type OutboxMinAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutboxMaxAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutboxCountAggregateInputType = {
    id?: true;
    type?: true;
    payload?: true;
    status?: true;
    retryCount?: true;
    error?: true;
    processedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OutboxAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboxWhereInput;
    orderBy?: Prisma.OutboxOrderByWithRelationInput | Prisma.OutboxOrderByWithRelationInput[];
    cursor?: Prisma.OutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OutboxCountAggregateInputType;
    _avg?: OutboxAvgAggregateInputType;
    _sum?: OutboxSumAggregateInputType;
    _min?: OutboxMinAggregateInputType;
    _max?: OutboxMaxAggregateInputType;
};
export type GetOutboxAggregateType<T extends OutboxAggregateArgs> = {
    [P in keyof T & keyof AggregateOutbox]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOutbox[P]> : Prisma.GetScalarType<T[P], AggregateOutbox[P]>;
};
export type OutboxGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboxWhereInput;
    orderBy?: Prisma.OutboxOrderByWithAggregationInput | Prisma.OutboxOrderByWithAggregationInput[];
    by: Prisma.OutboxScalarFieldEnum[] | Prisma.OutboxScalarFieldEnum;
    having?: Prisma.OutboxScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OutboxCountAggregateInputType | true;
    _avg?: OutboxAvgAggregateInputType;
    _sum?: OutboxSumAggregateInputType;
    _min?: OutboxMinAggregateInputType;
    _max?: OutboxMaxAggregateInputType;
};
export type OutboxGroupByOutputType = {
    id: string;
    type: string;
    payload: runtime.JsonValue;
    status: string;
    retryCount: number;
    error: string | null;
    processedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OutboxCountAggregateOutputType | null;
    _avg: OutboxAvgAggregateOutputType | null;
    _sum: OutboxSumAggregateOutputType | null;
    _min: OutboxMinAggregateOutputType | null;
    _max: OutboxMaxAggregateOutputType | null;
};
type GetOutboxGroupByPayload<T extends OutboxGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OutboxGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OutboxGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OutboxGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OutboxGroupByOutputType[P]>;
}>>;
export type OutboxWhereInput = {
    AND?: Prisma.OutboxWhereInput | Prisma.OutboxWhereInput[];
    OR?: Prisma.OutboxWhereInput[];
    NOT?: Prisma.OutboxWhereInput | Prisma.OutboxWhereInput[];
    id?: Prisma.StringFilter<"Outbox"> | string;
    type?: Prisma.StringFilter<"Outbox"> | string;
    payload?: Prisma.JsonFilter<"Outbox">;
    status?: Prisma.StringFilter<"Outbox"> | string;
    retryCount?: Prisma.IntFilter<"Outbox"> | number;
    error?: Prisma.StringNullableFilter<"Outbox"> | string | null;
    processedAt?: Prisma.DateTimeNullableFilter<"Outbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Outbox"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Outbox"> | Date | string;
};
export type OutboxOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OutboxWhereInput | Prisma.OutboxWhereInput[];
    OR?: Prisma.OutboxWhereInput[];
    NOT?: Prisma.OutboxWhereInput | Prisma.OutboxWhereInput[];
    type?: Prisma.StringFilter<"Outbox"> | string;
    payload?: Prisma.JsonFilter<"Outbox">;
    status?: Prisma.StringFilter<"Outbox"> | string;
    retryCount?: Prisma.IntFilter<"Outbox"> | number;
    error?: Prisma.StringNullableFilter<"Outbox"> | string | null;
    processedAt?: Prisma.DateTimeNullableFilter<"Outbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Outbox"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Outbox"> | Date | string;
}, "id">;
export type OutboxOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    processedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OutboxCountOrderByAggregateInput;
    _avg?: Prisma.OutboxAvgOrderByAggregateInput;
    _max?: Prisma.OutboxMaxOrderByAggregateInput;
    _min?: Prisma.OutboxMinOrderByAggregateInput;
    _sum?: Prisma.OutboxSumOrderByAggregateInput;
};
export type OutboxScalarWhereWithAggregatesInput = {
    AND?: Prisma.OutboxScalarWhereWithAggregatesInput | Prisma.OutboxScalarWhereWithAggregatesInput[];
    OR?: Prisma.OutboxScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OutboxScalarWhereWithAggregatesInput | Prisma.OutboxScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Outbox"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Outbox"> | string;
    payload?: Prisma.JsonWithAggregatesFilter<"Outbox">;
    status?: Prisma.StringWithAggregatesFilter<"Outbox"> | string;
    retryCount?: Prisma.IntWithAggregatesFilter<"Outbox"> | number;
    error?: Prisma.StringNullableWithAggregatesFilter<"Outbox"> | string | null;
    processedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Outbox"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Outbox"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Outbox"> | Date | string;
};
export type OutboxCreateInput = {
    id?: string;
    type: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    retryCount?: number;
    error?: string | null;
    processedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboxUncheckedCreateInput = {
    id?: string;
    type: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    retryCount?: number;
    error?: string | null;
    processedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboxUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboxUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboxCreateManyInput = {
    id?: string;
    type: string;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: string;
    retryCount?: number;
    error?: string | null;
    processedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboxUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboxUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    retryCount?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboxCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboxAvgOrderByAggregateInput = {
    retryCount?: Prisma.SortOrder;
};
export type OutboxMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboxMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    retryCount?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    processedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboxSumOrderByAggregateInput = {
    retryCount?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type OutboxSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    payload?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["outbox"]>;
export type OutboxSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    payload?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["outbox"]>;
export type OutboxSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    payload?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["outbox"]>;
export type OutboxSelectScalar = {
    id?: boolean;
    type?: boolean;
    payload?: boolean;
    status?: boolean;
    retryCount?: boolean;
    error?: boolean;
    processedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OutboxOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "payload" | "status" | "retryCount" | "error" | "processedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["outbox"]>;
export type $OutboxPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Outbox";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: string;
        payload: runtime.JsonValue;
        status: string;
        retryCount: number;
        error: string | null;
        processedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["outbox"]>;
    composites: {};
};
export type OutboxGetPayload<S extends boolean | null | undefined | OutboxDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OutboxPayload, S>;
export type OutboxCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OutboxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OutboxCountAggregateInputType | true;
};
export interface OutboxDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Outbox'];
        meta: {
            name: 'Outbox';
        };
    };
    findUnique<T extends OutboxFindUniqueArgs>(args: Prisma.SelectSubset<T, OutboxFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OutboxFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OutboxFindFirstArgs>(args?: Prisma.SelectSubset<T, OutboxFindFirstArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OutboxFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OutboxFindManyArgs>(args?: Prisma.SelectSubset<T, OutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OutboxCreateArgs>(args: Prisma.SelectSubset<T, OutboxCreateArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OutboxCreateManyArgs>(args?: Prisma.SelectSubset<T, OutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OutboxCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OutboxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OutboxDeleteArgs>(args: Prisma.SelectSubset<T, OutboxDeleteArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OutboxUpdateArgs>(args: Prisma.SelectSubset<T, OutboxUpdateArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OutboxDeleteManyArgs>(args?: Prisma.SelectSubset<T, OutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OutboxUpdateManyArgs>(args: Prisma.SelectSubset<T, OutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OutboxUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OutboxUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OutboxUpsertArgs>(args: Prisma.SelectSubset<T, OutboxUpsertArgs<ExtArgs>>): Prisma.Prisma__OutboxClient<runtime.Types.Result.GetResult<Prisma.$OutboxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OutboxCountArgs>(args?: Prisma.Subset<T, OutboxCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OutboxCountAggregateOutputType> : number>;
    aggregate<T extends OutboxAggregateArgs>(args: Prisma.Subset<T, OutboxAggregateArgs>): Prisma.PrismaPromise<GetOutboxAggregateType<T>>;
    groupBy<T extends OutboxGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OutboxGroupByArgs['orderBy'];
    } : {
        orderBy?: OutboxGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OutboxFieldRefs;
}
export interface Prisma__OutboxClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OutboxFieldRefs {
    readonly id: Prisma.FieldRef<"Outbox", 'String'>;
    readonly type: Prisma.FieldRef<"Outbox", 'String'>;
    readonly payload: Prisma.FieldRef<"Outbox", 'Json'>;
    readonly status: Prisma.FieldRef<"Outbox", 'String'>;
    readonly retryCount: Prisma.FieldRef<"Outbox", 'Int'>;
    readonly error: Prisma.FieldRef<"Outbox", 'String'>;
    readonly processedAt: Prisma.FieldRef<"Outbox", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Outbox", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Outbox", 'DateTime'>;
}
export type OutboxFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where: Prisma.OutboxWhereUniqueInput;
};
export type OutboxFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where: Prisma.OutboxWhereUniqueInput;
};
export type OutboxFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where?: Prisma.OutboxWhereInput;
    orderBy?: Prisma.OutboxOrderByWithRelationInput | Prisma.OutboxOrderByWithRelationInput[];
    cursor?: Prisma.OutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboxScalarFieldEnum | Prisma.OutboxScalarFieldEnum[];
};
export type OutboxFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where?: Prisma.OutboxWhereInput;
    orderBy?: Prisma.OutboxOrderByWithRelationInput | Prisma.OutboxOrderByWithRelationInput[];
    cursor?: Prisma.OutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboxScalarFieldEnum | Prisma.OutboxScalarFieldEnum[];
};
export type OutboxFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where?: Prisma.OutboxWhereInput;
    orderBy?: Prisma.OutboxOrderByWithRelationInput | Prisma.OutboxOrderByWithRelationInput[];
    cursor?: Prisma.OutboxWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboxScalarFieldEnum | Prisma.OutboxScalarFieldEnum[];
};
export type OutboxCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboxCreateInput, Prisma.OutboxUncheckedCreateInput>;
};
export type OutboxCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OutboxCreateManyInput | Prisma.OutboxCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OutboxCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    data: Prisma.OutboxCreateManyInput | Prisma.OutboxCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OutboxUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboxUpdateInput, Prisma.OutboxUncheckedUpdateInput>;
    where: Prisma.OutboxWhereUniqueInput;
};
export type OutboxUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OutboxUpdateManyMutationInput, Prisma.OutboxUncheckedUpdateManyInput>;
    where?: Prisma.OutboxWhereInput;
    limit?: number;
};
export type OutboxUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboxUpdateManyMutationInput, Prisma.OutboxUncheckedUpdateManyInput>;
    where?: Prisma.OutboxWhereInput;
    limit?: number;
};
export type OutboxUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where: Prisma.OutboxWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutboxCreateInput, Prisma.OutboxUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OutboxUpdateInput, Prisma.OutboxUncheckedUpdateInput>;
};
export type OutboxDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
    where: Prisma.OutboxWhereUniqueInput;
};
export type OutboxDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboxWhereInput;
    limit?: number;
};
export type OutboxDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboxSelect<ExtArgs> | null;
    omit?: Prisma.OutboxOmit<ExtArgs> | null;
};
export {};
