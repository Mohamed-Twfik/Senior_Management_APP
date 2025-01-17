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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const departments_service_1 = require("../departments/departments.service");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../utils/classes/base.service");
const workerType_enum_1 = require("../workers/enums/workerType.enum");
const workers_service_1 = require("../workers/workers.service");
const production_entity_1 = require("./entities/production.entity");
let ProductionService = class ProductionService extends base_service_1.BaseService {
    constructor(productionModel, usersService, productsService, workersService, departmentsService) {
        super();
        this.productionModel = productionModel;
        this.usersService = usersService;
        this.productsService = productsService;
        this.workersService = workersService;
        this.departmentsService = departmentsService;
        this.searchableKeys = [
            "arabicDate",
            "createdAtArabic",
            "updatedAtArabic",
        ];
    }
    getModuleModel() {
        return this.productionModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            workers: await this.workersService.find(),
            products: await this.productsService.find(),
            departments: await this.departmentsService.find(),
            type: 'production',
            title: 'الإنتاج'
        };
    }
    async create(createProductionDto, user) {
        const existProduction = await this.productionModel.findOne({
            worker: createProductionDto.worker,
            date: createProductionDto.date,
            product: createProductionDto.product,
            department: createProductionDto.department
        });
        if (existProduction)
            throw new common_1.ConflictException('تم إضافة الإنتاج مسبقا.');
        const inputDate = {
            ...createProductionDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.productionModel.create(inputDate);
    }
    async findAll(queryParams, user) {
        const queryBuilder = this.getQueryBuilder(queryParams);
        const production = await queryBuilder
            .filter()
            .search(this.searchableKeys)
            .sort()
            .paginate()
            .build()
            .populate('worker', 'name')
            .populate('product', 'name')
            .populate('department', 'name')
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username');
        const renderVariables = {
            error: queryParams.error || null,
            data: production,
            user,
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
        return { ...renderVariables, ...(await this.getAdditionalRenderVariables()) };
    }
    async update(production, updateProductionDto, user) {
        const existProduction = await this.productionModel.findOne({
            worker: updateProductionDto.worker,
            date: updateProductionDto.date,
            product: updateProductionDto.product,
            department: updateProductionDto.department,
            _id: { $ne: production._id }
        });
        if (existProduction)
            throw new common_1.ConflictException('تم إضافة الإنتاج مسبقا.');
        const inputData = {
            ...updateProductionDto,
            updatedBy: user._id
        };
        await production.set(inputData).save();
    }
    getSalaryData(startDate, endDate) {
        return this.productionModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $lookup: {
                    from: 'workers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'workerDetails',
                },
            },
            {
                $unwind: '$workerDetails',
            },
            {
                $match: {
                    'workerDetails.type': { $ne: workerType_enum_1.WorkerType.Weekly },
                },
            },
            {
                $group: {
                    _id: '$worker',
                    totalPrice: { $sum: { $ifNull: ['$price', 0] } },
                    name: { $first: '$workerDetails.name' },
                    department: { $first: '$workerDetails.department' },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    department: 1,
                    totalPrice: 1,
                },
            },
        ]);
    }
};
exports.ProductionService = ProductionService;
exports.ProductionService = ProductionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(production_entity_1.Production.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        workers_service_1.WorkersService,
        departments_service_1.DepartmentsService])
], ProductionService);
//# sourceMappingURL=production.service.js.map