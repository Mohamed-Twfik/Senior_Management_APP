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
const base_service_1 = require("../../utils/classes/base.service");
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
        const inputDate = await Promise.all(createProductionDto.productionDetails.map(async (productionDetail) => {
            const existProduction = await this.productionModel.findOne({
                worker: createProductionDto.worker,
                date: createProductionDto.date,
                product: productionDetail.product,
                department: productionDetail.department
            });
            if (existProduction)
                throw new common_1.ConflictException('تم إضافة الإنتاج مسبقا.');
            return {
                ...productionDetail,
                worker: createProductionDto.worker,
                date: createProductionDto.date,
                createdBy: user._id,
                updatedBy: user._id,
            };
        }));
        await this.productionModel.create(inputDate);
    }
    applyFilters(queryBuilder) {
        return super.applyFilters(queryBuilder)
            .populate('worker', 'name')
            .populate('product', 'name')
            .populate('department', 'name');
    }
    async update(production, updateProductionDto, user) {
        const existProduction = await this.productionModel.findOne({
            worker: updateProductionDto.worker,
            date: updateProductionDto.date,
            product: updateProductionDto.productionDetails[0].product,
            department: updateProductionDto.productionDetails[0].department,
            _id: { $ne: production._id }
        });
        if (existProduction)
            throw new common_1.ConflictException('تم إضافة الإنتاج مسبقا.');
        const inputData = {
            ...updateProductionDto.productionDetails[0],
            worker: updateProductionDto.worker,
            date: updateProductionDto.date,
            updatedBy: user._id
        };
        await production.set(inputData).save();
    }
    async getSalaryData(startDate, endDate) {
        const workers = await this.productionModel.aggregate([
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
                    localField: 'worker',
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
                    _id: 1,
                    name: 1,
                    department: 1,
                    totalPrice: 1,
                },
            },
        ]);
        return workers;
    }
    async getProductsStats(from, to) {
        const productsStats = await this.productionModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: from,
                        $lte: to,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        product: "$product",
                        department: "$department"
                    },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $group: {
                    _id: "$_id.product",
                    departments: {
                        $push: {
                            departmentId: "$_id.department",
                            totalQuantity: "$totalQuantity"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "departments.departmentId",
                    foreignField: "_id",
                    as: "departmentDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    productId: "$product._id",
                    productName: "$product.name",
                    departments: {
                        $map: {
                            input: "$departments",
                            as: "dept",
                            in: {
                                departmentId: "$$dept.departmentId",
                                departmentName: {
                                    $arrayElemAt: [
                                        "$departmentDetails.name",
                                        { $indexOfArray: ["$departmentDetails._id", "$$dept.departmentId"] }
                                    ]
                                },
                                totalQuantity: "$$dept.totalQuantity"
                            }
                        }
                    }
                }
            }
        ]);
        return productsStats;
    }
    async getDepartmentsStats(from, to) {
        const departmentsStats = await this.productionModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: from,
                        $lte: to,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        product: "$product",
                        department: "$department"
                    },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $group: {
                    _id: "$_id.department",
                    products: {
                        $push: {
                            productId: "$_id.product",
                            totalQuantity: "$totalQuantity"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $unwind: "$department"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    departmentId: "$department._id",
                    departmentName: "$department.name",
                    products: {
                        $map: {
                            input: "$products",
                            as: "prod",
                            in: {
                                productId: "$$prod.productId",
                                productName: {
                                    $arrayElemAt: [
                                        "$productDetails.name",
                                        { $indexOfArray: ["$productDetails._id", "$$prod.productId"] }
                                    ]
                                },
                                totalQuantity: "$$prod.totalQuantity"
                            }
                        }
                    }
                }
            }
        ]);
        return departmentsStats;
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