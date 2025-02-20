import { Query } from "mongoose";
import { QueryDto } from "../dtos/query.dto";
export declare class FindQueryBuilderService {
    private static defaultPageSize;
    private static defaultSortKey;
    private static defaultSearchKey;
    private static defaultPage;
    private query;
    private queryParams;
    private page;
    private pageSize;
    private sortKey;
    private searchKey;
    private customFilters;
    constructor(query: Query<any, any>, queryParams: QueryDto);
    resetParameters(query: Query<any, any>, queryParams: QueryDto): void;
    filter(): this;
    paginate(): this;
    sort(): this;
    selectFields(): this;
    search(searchableFields: string[]): this;
    build(): Query<any, any, {}, unknown, "find", Record<string, never>>;
    getTotalPages(): Promise<number>;
    getPage(): number;
    getPageSize(): number;
    getSortKey(): string;
    getSearchKey(): string;
    getCustomFilters(): {
        username: string;
        role: string;
        from: string;
        to: string;
        percentage: string;
        worker: string;
        product: string;
        department: string;
        quantity: string;
        arabicDate: string;
        cost: string;
        price: string;
        name: string;
        createdBy: string;
        updatedBy: string;
        createdAtArabic: string;
        updatedAtArabic: string;
    };
}
