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
exports.PriceTypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const departments_service_1 = require("../departments/departments.service");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../../utils/classes/base.service");
const price_type_entity_1 = require("./entities/price-type.entity");
let PriceTypeService = class PriceTypeService extends base_service_1.BaseService {
    constructor(priceTypeModel, usersService, departmentsService) {
        super();
        this.priceTypeModel = priceTypeModel;
        this.usersService = usersService;
        this.departmentsService = departmentsService;
    }
    getModuleModel() {
        return this.priceTypeModel;
    }
    applyFilters(queryBuilder) {
        return super.applyFilters(queryBuilder).populate('departmentsPrice.department', 'name');
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            departments: await this.departmentsService.find(),
            type: 'priceType',
            title: 'انواع الاسعار'
        };
    }
    async create(createDto, user) {
        const existPrice = await this.priceTypeModel.findOne({ name: createDto.name });
        if (existPrice)
            throw new common_1.ConflictException('نوع السعر موجود بالفعل');
        const inputData = {
            ...createDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.priceTypeModel.create(inputData);
    }
    async update(entity, updateDto, user) {
        const existPrice = await this.priceTypeModel.findOne({
            $and: [
                { name: updateDto.name },
                { _id: { $ne: entity._id } }
            ]
        });
        if (existPrice)
            throw new common_1.ConflictException('نوع السعر موجود بالفعل');
        const inputData = {
            ...updateDto,
            updatedBy: user._id
        };
        await entity.set(inputData).save();
    }
};
exports.PriceTypeService = PriceTypeService;
exports.PriceTypeService = PriceTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(price_type_entity_1.PriceType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        departments_service_1.DepartmentsService])
], PriceTypeService);
//# sourceMappingURL=price-type.service.js.map