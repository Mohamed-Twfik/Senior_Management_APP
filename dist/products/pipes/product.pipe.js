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
exports.ProductPipe = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../../departments/departments.service");
const products_service_1 = require("../products.service");
let ProductPipe = class ProductPipe {
    constructor(productsService, departmentsService) {
        this.productsService = productsService;
        this.departmentsService = departmentsService;
    }
    async transform(data, metadata) {
        const categoryExists = await this.productsService.findById(data.category.toString());
        if (!categoryExists)
            throw new common_1.NotAcceptableException('خطأ في معرف الفئة.');
        data.category = categoryExists._id;
        return data;
    }
};
exports.ProductPipe = ProductPipe;
exports.ProductPipe = ProductPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        departments_service_1.DepartmentsService])
], ProductPipe);
//# sourceMappingURL=product.pipe.js.map