"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FindQueryBuilderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindQueryBuilderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const query_dto_1 = require("../dtos/query.dto");
let FindQueryBuilderService = FindQueryBuilderService_1 = class FindQueryBuilderService {
    constructor(query, queryParams) {
        this.page = FindQueryBuilderService_1.defaultPage;
        this.pageSize = FindQueryBuilderService_1.defaultPageSize;
        this.sortKey = FindQueryBuilderService_1.defaultSortKey;
        this.searchKey = FindQueryBuilderService_1.defaultSearchKey;
        this.customFilters = {
            username: "",
            role: "",
            from: "",
            to: "",
            percentage: "",
            worker: "",
            product: "",
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
        this.query = query;
        this.queryParams = queryParams;
    }
    resetParameters(query, queryParams) {
        this.page = FindQueryBuilderService_1.defaultPage;
        this.pageSize = FindQueryBuilderService_1.defaultPageSize;
        this.sortKey = FindQueryBuilderService_1.defaultSortKey;
        this.searchKey = FindQueryBuilderService_1.defaultSearchKey;
        this.query = query;
        this.queryParams = queryParams;
        for (const key in this.customFilters)
            this.customFilters[key] = "";
    }
    filter() {
        const { page, pageSize, sort, fields, search, ...filterObj } = this.queryParams;
        if (Object.keys(filterObj).length === 0)
            return this;
        for (const e of Object.entries(filterObj)) {
            const filterKey = e[0];
            let queryValue = e[1].split(":");
            let filterValue = queryValue[0];
            let customFilterValue = queryValue[0];
            if (queryValue.length > 1) {
                filterValue = this.filterQueryInterpreter(queryValue);
                customFilterValue = queryValue[1];
            }
            ;
            filterObj[filterKey] = filterValue;
            this.customFilters[filterKey] = customFilterValue;
        }
        this.query = this.query.find(filterObj);
        return this;
    }
    filterQueryInterpreter(queryValue) {
        return FindQueryBuilderService_1.filterKeyWords[queryValue[0]](queryValue[1]);
    }
    paginate() {
        if (this.queryParams.page)
            this.page = this.queryParams.page;
        if (this.queryParams.pageSize)
            this.pageSize = this.queryParams.pageSize;
        const skip = (this.page - 1) * this.pageSize;
        this.query = this.query.skip(skip).limit(this.pageSize);
        return this;
    }
    sort() {
        if (this.queryParams.sort)
            this.sortKey = this.queryParams.sort;
        this.query = this.query.sort(this.sortKey);
        return this;
    }
    selectFields() {
        if (this.queryParams.fields)
            this.query = this.query.select(this.queryParams.fields);
        return this;
    }
    build() {
        return this.query;
    }
    async getTotalPages() {
        const totalCount = await this.query.model.countDocuments(this.query.getFilter());
        return Math.ceil(totalCount / this.pageSize);
    }
    getPage() {
        return this.page;
    }
    getPageSize() {
        return this.pageSize;
    }
    getSortKey() {
        return this.sortKey;
    }
    getSearchKey() {
        return this.searchKey;
    }
    getCustomFilters() {
        return this.customFilters;
    }
};
exports.FindQueryBuilderService = FindQueryBuilderService;
FindQueryBuilderService.defaultPageSize = 10;
FindQueryBuilderService.defaultSortKey = '-createdAt';
FindQueryBuilderService.defaultSearchKey = "";
FindQueryBuilderService.defaultPage = 1;
FindQueryBuilderService.filterKeyWords = {
    "objectid": (value) => {
        return new mongoose_1.Types.ObjectId(value);
    },
    "gt": (value) => {
        return { $gt: value };
    },
    "gte": (value) => {
        return { $gte: value };
    },
    "lt": (value) => {
        return { $lt: value };
    },
    "lte": (value) => {
        return { $lte: value };
    },
    "search": (value) => {
        return new RegExp(value, 'i');
    },
    "daterange": (value) => {
        const dateRange = value.split(",");
        return { $gte: new Date(dateRange[0]), $lte: new Date(dateRange[1]) };
    }
};
exports.FindQueryBuilderService = FindQueryBuilderService = FindQueryBuilderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Query, query_dto_1.QueryDto])
], FindQueryBuilderService);
//# sourceMappingURL=find-query-builder.service.js.map