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
exports.ProductCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../../utils/classes/base.service");
const product_category_entity_1 = require("./entities/product-category.entity");
let ProductCategoryService = class ProductCategoryService extends base_service_1.BaseService {
    constructor(productCategoryModel, usersService) {
        super();
        this.productCategoryModel = productCategoryModel;
        this.usersService = usersService;
        this.searchableKeys = [
            "name"
        ];
    }
    getModuleModel() {
        return this.productCategoryModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            type: 'productCategory',
            title: 'فئات المنتجات'
        };
    }
    async create(createDto, user) {
        const existProductCategory = await this.findOne({ name: createDto.name });
        if (existProductCategory)
            throw new common_1.ConflictException('إسم الفئة موجود بالفعل');
        const inputDate = {
            ...createDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.productCategoryModel.create(inputDate);
    }
    async update(entity, updateDto, user) {
        const existProductCategory = await this.findOne({
            $and: [
                { name: updateDto.name },
                { _id: { $ne: entity._id } }
            ]
        });
        if (existProductCategory)
            throw new common_1.ConflictException('إسم المنتج موجود بالفعل');
        const inputData = {
            ...updateDto,
            updatedBy: user._id
        };
        await entity.set(inputData).save();
    }
};
exports.ProductCategoryService = ProductCategoryService;
exports.ProductCategoryService = ProductCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_category_entity_1.ProductCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], ProductCategoryService);
//# sourceMappingURL=product-category.service.js.map