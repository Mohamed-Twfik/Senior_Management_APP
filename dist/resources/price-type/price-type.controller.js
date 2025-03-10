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
exports.PriceTypeController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../../utils/pipes/queryParam.pipe");
const price_type_dto_1 = require("./dto/price-type.dto");
const price_type_id_pipe_1 = require("./pipes/price-type-id.pipe");
const price_type_pipe_1 = require("./pipes/price-type.pipe");
const price_type_service_1 = require("./price-type.service");
let PriceTypeController = class PriceTypeController {
    constructor(priceTypeService) {
        this.priceTypeService = priceTypeService;
    }
    create(createPriceTypeDto, user) {
        return this.priceTypeService.create(createPriceTypeDto, user);
    }
    findAll(queryParams, user) {
        return this.priceTypeService.findAll(queryParams, user);
    }
    update(priceType, updatePriceTypeDto, user) {
        return this.priceTypeService.update(priceType, updatePriceTypeDto, user);
    }
    remove(priceType) {
        return this.priceTypeService.remove(priceType);
    }
};
exports.PriceTypeController = PriceTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/priceType'),
    __param(0, (0, common_1.Body)(price_type_pipe_1.PriceTypePipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_type_dto_1.PriceTypeDto, Object]),
    __metadata("design:returntype", void 0)
], PriceTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PriceTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:priceTypeId'),
    (0, common_1.Redirect)('/priceType?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('priceTypeId', ObjectId_pipe_1.ObjectIdPipe, price_type_id_pipe_1.PriceTypeIdPipe)),
    __param(1, (0, common_1.Body)(price_type_pipe_1.PriceTypePipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, price_type_dto_1.PriceTypeDto, Object]),
    __metadata("design:returntype", void 0)
], PriceTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:priceTypeId'),
    (0, common_1.Redirect)('/priceType'),
    __param(0, (0, common_1.Param)('priceTypeId', ObjectId_pipe_1.ObjectIdPipe, price_type_id_pipe_1.PriceTypeIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PriceTypeController.prototype, "remove", null);
exports.PriceTypeController = PriceTypeController = __decorate([
    (0, common_1.Controller)('priceType'),
    __metadata("design:paramtypes", [price_type_service_1.PriceTypeService])
], PriceTypeController);
//# sourceMappingURL=price-type.controller.js.map