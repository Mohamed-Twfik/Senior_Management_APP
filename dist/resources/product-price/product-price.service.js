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
exports.ProductPriceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../../utils/classes/base.service");
const departments_service_1 = require("../departments/departments.service");
const products_service_1 = require("../products/products.service");
const product_price_entity_1 = require("./entities/product-price.entity");
let ProductPriceService = class ProductPriceService extends base_service_1.BaseService {
    constructor(productPriceModel, usersService, productsService, departmentsService) {
        super();
        this.productPriceModel = productPriceModel;
        this.usersService = usersService;
        this.productsService = productsService;
        this.departmentsService = departmentsService;
        this.searchableKeys = [];
    }
    getModuleModel() {
        return this.productPriceModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            products: await this.productsService.find(),
            departments: await this.departmentsService.find(),
            type: 'productPrice',
            title: 'أسعار المنتجات'
        };
    }
    async create(createProductPriceDto, user) {
        const existPrice = await this.productPriceModel.findOne({ department: createProductPriceDto.department, product: createProductPriceDto.product });
        if (existPrice)
            throw new common_1.ConflictException('سعر المنتج في هذا القسم موجود بالفعل');
        const inputData = {
            ...createProductPriceDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.productPriceModel.create(inputData);
    }
    applyFilters(queryBuilder) {
        return super.applyFilters(queryBuilder).populate('product', 'name').populate('department', 'name');
    }
    async update(productPrice, updateProductPriceDto, user) {
        const existPrice = await this.productPriceModel.findOne({
            $and: [
                { department: updateProductPriceDto.department },
                { product: updateProductPriceDto.product },
                { _id: { $ne: productPrice._id } }
            ]
        });
        if (existPrice)
            throw new common_1.ConflictException('سعر المنتج في هذا القسم موجود بالفعل');
        const inputData = {
            ...updateProductPriceDto,
            updatedBy: user._id
        };
        await productPrice.set(inputData).save();
    }
};
exports.ProductPriceService = ProductPriceService;
exports.ProductPriceService = ProductPriceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_price_entity_1.ProductPrice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        departments_service_1.DepartmentsService])
], ProductPriceService);
//# sourceMappingURL=product-price.service.js.map