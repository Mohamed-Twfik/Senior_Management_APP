"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const find_query_builder_service_1 = require("./find-query-builder.service");
const input_field_date_format_1 = require("../input-field-date-format");
class BaseService {
    constructor() {
        this.queryBuilder = null;
    }
    getQueryBuilder(queryParams, filter = {}) {
        const query = this.getModuleModel().find(filter);
        if (!this.queryBuilder)
            this.queryBuilder = new find_query_builder_service_1.FindQueryBuilderService(query, queryParams);
        else
            this.queryBuilder.resetParameters(query, queryParams);
        return this.queryBuilder;
    }
    find(filter = {}) {
        return this.getModuleModel().find(filter);
    }
    ;
    applyFilters(queryBuilder) {
        return queryBuilder
            .filter()
            .sort()
            .paginate()
            .build()
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
    }
    async findAll(queryParams, user) {
        const { error, ...queryParamsForQuery } = queryParams;
        const queryBuilder = this.getQueryBuilder(queryParamsForQuery);
        const data = await this.applyFilters(queryBuilder);
        const baseRenderVariables = {
            error: error || null,
            data,
            user,
            todayDate: input_field_date_format_1.todayFormatted,
            salaryForm: {
                from: input_field_date_format_1.lastSaturdayFormatted,
                to: input_field_date_format_1.todayFormatted
            },
            filters: {
                search: queryBuilder.getSearchKey(),
                sort: queryBuilder.getSortKey(),
                pagination: {
                    page: queryBuilder.getPage(),
                    totalPages: await queryBuilder.getTotalPages(),
                    pageSize: queryBuilder.getPageSize()
                },
                ...queryBuilder.getCustomFilters()
            }
        };
        const renderVariables = { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
        return renderVariables;
    }
    findById(id) {
        return this.getModuleModel().findById(id);
    }
    ;
    findOne(filter) {
        return this.getModuleModel().findOne(filter);
    }
    ;
    updateMany(filter, updateDto) {
        return this.getModuleModel().updateMany(filter, updateDto);
    }
    removeMany(filter) {
        return this.getModuleModel().deleteMany(filter);
    }
    async remove(entity) {
        await this.getModuleModel().findByIdAndDelete(entity._id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map