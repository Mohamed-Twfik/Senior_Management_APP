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
const product_price_service_1 = require("../../product-price/product-price.service");
const products_service_1 = require("../../products/products.service");
const workers_service_1 = require("../../workers/workers.service");
let ProductionDataPipe = class ProductionDataPipe {
    constructor(productPriceService, productsService, workersService, departmentsService) {
        this.productPriceService = productPriceService;
        this.productsService = productsService;
        this.workersService = workersService;
        this.departmentsService = departmentsService;
    }
    async transform(data, metadata) {
        const productExists = await this.productsService.findById(data.product.toString());
        if (!productExists)
            throw new common_1.NotAcceptableException('خطأ في معرف المنتج.');
        data.product = productExists._id;
        const workerExists = await this.workersService.findById(data.worker.toString());
        if (!workerExists)
            throw new common_1.NotAcceptableException('خطأ في معرف العامل.');
        data.worker = workerExists._id;
        if (data.department) {
            const departmentExists = await this.departmentsService.findById(data.department.toString());
            if (!departmentExists)
                throw new common_1.NotAcceptableException('خطأ في معرف القسم.');
            data.department = departmentExists._id;
        }
        else {
            data.department = workerExists.department;
        }
        if (workerExists.type !== workerType_enum_1.WorkerType.Weekly) {
            const productPrice = await this.productPriceService.findOne({ product: data.product, department: data.department });
            if (!productPrice)
                throw new common_1.NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
            data.price = Math.ceil((productPrice.price / 100) * data.quantity);
        }
        return data;
    }
};
exports.ProductionDataPipe = ProductionDataPipe;
exports.ProductionDataPipe = ProductionDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_price_service_1.ProductPriceService,
        products_service_1.ProductsService,
        workers_service_1.WorkersService,
        departments_service_1.DepartmentsService])
], ProductionDataPipe);
//# sourceMappingURL=production-data.pipe.js.map