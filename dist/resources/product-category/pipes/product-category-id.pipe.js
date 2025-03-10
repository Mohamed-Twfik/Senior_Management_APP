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
exports.ProductCategoryIdPipe = void 0;
const common_1 = require("@nestjs/common");
const product_category_service_1 = require("../product-category.service");
let ProductCategoryIdPipe = class ProductCategoryIdPipe {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    async transform(productCategoryId, metadata) {
        const productCategory = await this.productCategoryService.findById(productCategoryId);
        if (!productCategory)
            throw new common_1.NotFoundException('خطأ في معرف المنتج.');
        return productCategory;
    }
};
exports.ProductCategoryIdPipe = ProductCategoryIdPipe;
exports.ProductCategoryIdPipe = ProductCategoryIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService])
], ProductCategoryIdPipe);
//# sourceMappingURL=product-category-id.pipe.js.map