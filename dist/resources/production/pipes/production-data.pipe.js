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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionDataPipe = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../../departments/departments.service");
const workerType_enum_1 = require("../../workers/enums/workerType.enum");
const products_service_1 = require("../../products/products.service");
const workers_service_1 = require("../../workers/workers.service");
const price_type_service_1 = require("../../price-type/price-type.service");
let ProductionDataPipe = class ProductionDataPipe {
    constructor(productsService, workersService, departmentsService, priceTypeService) {
        this.productsService = productsService;
        this.workersService = workersService;
        this.departmentsService = departmentsService;
        this.priceTypeService = priceTypeService;
    }
    async transform(data, metadata) {
        const workerExists = await this.workersService.findById(data.worker.toString());
        if (!workerExists)
            throw new common_1.NotAcceptableException('خطأ في معرف العامل.');
        data.worker = workerExists._id;
        for (let i = 0; i < data.productionDetails.length; i++) {
            const productDetail = data.productionDetails[i];
            const productExists = await this.productsService.findById(productDetail.product.toString());
            if (!productExists)
                throw new common_1.NotAcceptableException('خطأ في معرف المنتج.');
            productDetail.product = productExists._id;
            if (productDetail.department) {
                const departmentExists = await this.departmentsService.findById(productDetail.department.toString());
                if (!departmentExists)
                    throw new common_1.NotAcceptableException('خطأ في معرف القسم.');
                productDetail.department = departmentExists._id;
            }
            else {
                productDetail.department = workerExists.department;
            }
            if (workerExists.type !== workerType_enum_1.WorkerType.Weekly) {
                const priceType = await this.priceTypeService.findById(productExists.priceType.toString());
                const unitPrice = priceType.departmentsPrice.find(price => price.department.toString() === productDetail.department.toString());
                productDetail.price = (unitPrice.price / 100) * productDetail.quantity;
            }
        }
        return data;
    }
};
exports.ProductionDataPipe = ProductionDataPipe;
exports.ProductionDataPipe = ProductionDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        workers_service_1.WorkersService,
        departments_service_1.DepartmentsService,
        price_type_service_1.PriceTypeService])
], ProductionDataPipe);
//# sourceMappingURL=production-data.pipe.js.map