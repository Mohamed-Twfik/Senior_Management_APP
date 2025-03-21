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
exports.ProductionController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../../utils/pipes/queryParam.pipe");
const production_dto_1 = require("./dto/production.dto");
const production_data_pipe_1 = require("./pipes/production-data.pipe");
const production_id_pipe_1 = require("./pipes/production-id.pipe");
const production_service_1 = require("./production.service");
let ProductionController = class ProductionController {
    constructor(productionService) {
        this.productionService = productionService;
    }
    create(createProductionDto, user) {
        return this.productionService.create(createProductionDto, user);
    }
    findAll(queryParams, user) {
        return this.productionService.findAll(queryParams, user);
    }
    update(production, queryParams, updateProductionDto, user) {
        return this.productionService.updateRoute(production, updateProductionDto, user, queryParams);
    }
    remove(production, queryParams) {
        return this.productionService.remove(production, queryParams);
    }
};
exports.ProductionController = ProductionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/production'),
    __param(0, (0, common_1.Body)(production_data_pipe_1.ProductionDataPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [production_dto_1.ProductionDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:productionId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('productionId', ObjectId_pipe_1.ObjectIdPipe, production_id_pipe_1.ProductionIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(2, (0, common_1.Body)(production_data_pipe_1.ProductionDataPipe)),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, production_dto_1.ProductionDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:productionId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('productionId', ObjectId_pipe_1.ObjectIdPipe, production_id_pipe_1.ProductionIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "remove", null);
exports.ProductionController = ProductionController = __decorate([
    (0, common_1.Controller)('production'),
    __metadata("design:paramtypes", [production_service_1.ProductionService])
], ProductionController);
//# sourceMappingURL=production.controller.js.map