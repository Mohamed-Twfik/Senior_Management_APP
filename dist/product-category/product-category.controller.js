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
exports.ProductCategoryController = void 0;
const common_1 = require("@nestjs/common");
const product_category_service_1 = require("./product-category.service");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const product_category_id_pipe_1 = require("./pipes/product-category-id.pipe");
const product_category_dto_1 = require("./dto/product-category.dto");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
let ProductCategoryController = class ProductCategoryController {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    create(user, productCategoryDto) {
        return this.productCategoryService.create(productCategoryDto, user);
    }
    findAll(queryParams, user) {
        return this.productCategoryService.findAll(queryParams, user);
    }
    update(productCategory, productCategoryDto, user) {
        return this.productCategoryService.update(productCategory, productCategoryDto, user);
    }
    remove(productCategory) {
        return this.productCategoryService.remove(productCategory);
    }
};
exports.ProductCategoryController = ProductCategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/productCategory'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_category_dto_1.ProductCategoryDto]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:productCategoryId'),
    (0, common_1.Redirect)('/productCategory?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('productCategoryId', ObjectId_pipe_1.ObjectIdPipe, product_category_id_pipe_1.ProductCategoryIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_category_dto_1.ProductCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:productCategoryId'),
    (0, common_1.Redirect)('/productCategory'),
    __param(0, (0, common_1.Param)('productCategoryId', ObjectId_pipe_1.ObjectIdPipe, product_category_id_pipe_1.ProductCategoryIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductCategoryController.prototype, "remove", null);
exports.ProductCategoryController = ProductCategoryController = __decorate([
    (0, common_1.Controller)('productCategory'),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService])
], ProductCategoryController);
//# sourceMappingURL=product-category.controller.js.map