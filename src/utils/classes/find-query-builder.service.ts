import { Injectable } from "@nestjs/common";
import { Query, Types } from "mongoose";
import { QueryDto } from "../dtos/query.dto";

/**
 * Query builder for find operations.
 * Used to build a Mongoose query object based on query string parameters.
 */
@Injectable()
export class FindQueryBuilderService {
  private static defaultPageSize: number = 10;
  private static defaultSortKey: string = '-createdAt';
  private static defaultSearchKey: string = "";
  private static defaultPage: number = 1;
  private static filterKeyWords = {
    "objectid": (value: string) => {
      return new Types.ObjectId(value)
    },
    "gt": (value: string) => {
      return { $gt: value };
    },
    "gte": (value: string) => {
      return { $gte: value };
    },
    "lt": (value: string) => {
      return { $lt: value };
    },
    "lte": (value: string) => {
      return { $lte: value };
    },
    "search": (value: string) => {
      return new RegExp(value, 'i');
    },
    "daterange": (value: string) => {
      const dateRange = value.split(",");
      return { $gte: new Date(dateRange[0]), $lte: new Date(dateRange[1]) };
    }
  };

  private query: Query<any, any>;
  private queryParams: QueryDto;
  private page: number = FindQueryBuilderService.defaultPage;
  private pageSize: number = FindQueryBuilderService.defaultPageSize;
  private sortKey: string = FindQueryBuilderService.defaultSortKey;
  private searchKey: string = FindQueryBuilderService.defaultSearchKey;
  private customFilters = {
    username: "",
    role: "",
    from: "",
    to: "",
    percentage: "",
    worker: "",
    product: "",
    category: "",
    priceType: "",
    department: "",
    quantity: "",
    arabicDate: "",
    price: "",
    name: "",
    createdBy: "",
    updatedBy: "",
    createdAtArabic: "",
    updatedAtArabic: "",
    salary: '',
    bonusLimit: '',
    date: ''
  };
  

  constructor(query: Query<any, any>, queryParams: QueryDto) {
    this.query = query;
    this.queryParams = queryParams;
  }

  /**
   * Reset the instance parameters.
   * Used to reset the instance parameters when chaining multiple query methods.
   *
   * @param queryParams - The new query parameters object.
   * @param query - The new Mongoose query object.
   */
  resetParameters(query: Query<any, any>, queryParams: QueryDto) {
    this.page = FindQueryBuilderService.defaultPage;
    this.pageSize = FindQueryBuilderService.defaultPageSize;
    this.sortKey = FindQueryBuilderService.defaultSortKey;
    this.searchKey = FindQueryBuilderService.defaultSearchKey;
    this.query = query;
    this.queryParams = queryParams;
    for (const key in this.customFilters) this.customFilters[key] = "";
  }

  /**
   * Applies filtering to the query based on query string parameters.
   * 
   * @returns The query builder instance.
   */
  filter() {
    const { page, pageSize, sort, fields, search, ...filterObj } = this.queryParams;

    if (Object.keys(filterObj).length === 0) return this;

    for (const e of Object.entries(filterObj)) {
      const filterKey = e[0];
      let queryValue = e[1].split(":");
      let filterValue = queryValue[0]; 
      let customFilterValue = queryValue[0];
      if (queryValue.length > 1) {
        filterValue = this.filterQueryInterpreter(queryValue);
        customFilterValue = queryValue[1];
      };
      filterObj[filterKey] = filterValue;
      this.customFilters[filterKey] = customFilterValue;
    }
    this.query = this.query.find(filterObj);
    return this;
  }

  private filterQueryInterpreter(queryValue: string[]) {
    return FindQueryBuilderService.filterKeyWords[queryValue[0]](queryValue[1])
  }
  
  /**
   * Applies pagination to the query.
   * Defaults to page 1 and page size 10.
   * 
   * @returns The query builder instance.
   */
  paginate() {
    if (this.queryParams.page) this.page = this.queryParams.page;
    if (this.queryParams.pageSize) this.pageSize = this.queryParams.pageSize;
    const skip = (this.page - 1) * this.pageSize;
    this.query = this.query.skip(skip).limit(this.pageSize);
    return this;
  }

  /**
   * Applies sorting to the query.
   * Defaults to sorting by creation date in descending order.
   * 
   * @returns The query builder instance.
   */
  sort() {
    if (this.queryParams.sort) this.sortKey = this.queryParams.sort;
    this.query = this.query.sort(this.sortKey);
    return this;
  }

  /**
   * Selects specific fields in the query results.
   * Defaults to selecting all fields.
   * 
   * @returns The query builder instance.
   */
  selectFields() {
    if(this.queryParams.fields) this.query = this.query.select(this.queryParams.fields);
    return this;
  }

  /**
   * Returns the built query.
   */
  build() {
    return this.query;
  }

  /**
   * Returns the total pages.
   */
  async getTotalPages() {
    const totalCount = await this.query.model.countDocuments(this.query.getFilter());
    return Math.ceil(totalCount / this.pageSize);
  }

  /**
   * Returns the current page number.
   */
  getPage() {
    return this.page;
  }

  /**
   * Returns the current page size.
   */
  getPageSize() {
    return this.pageSize;
  }

  /**
   * Returns the current sort key.
   */
  getSortKey() {
    return this.sortKey;
  }
  
  /**
   * Returns the current search key.
   */
  getSearchKey() {
    return this.searchKey;
  }

  getCustomFilters() {
    return this.customFilters;
  }
}