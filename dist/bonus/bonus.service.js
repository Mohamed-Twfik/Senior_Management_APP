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
exports.BonusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const departments_service_1 = require("../departments/departments.service");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../utils/classes/base.service");
const bonus_entity_1 = require("./entities/bonus.entity");
let BonusService = class BonusService extends base_service_1.BaseService {
    constructor(bonusModel, usersService, departmentsService) {
        super();
        this.bonusModel = bonusModel;
        this.usersService = usersService;
        this.departmentsService = departmentsService;
    }
    getModuleModel() {
        return this.bonusModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            departments: await this.departmentsService.find(),
            type: 'bonus',
            title: 'الحوافز',
        };
    }
    async create(createBonusDto, user) {
        const existBonus = await this.bonusModel.findOne({
            $and: [
                {
                    $or: [
                        { from: createBonusDto.from },
                        { to: createBonusDto.to }
                    ]
                },
                { department: createBonusDto.department }
            ]
        });
        if (existBonus)
            throw new common_1.ConflictException('أحد أطراف الحافز مكرر');
        const inputDate = {
            ...createBonusDto,
            createdBy: user._id,
            updatedBy: user._id,
        };
        await this.bonusModel.create(inputDate);
    }
    applyFilters(queryBuilder) {
        return super.applyFilters(queryBuilder).populate('department', 'name');
    }
    async update(bonus, updateBonusDto, user) {
        const existBonus = await this.bonusModel.findOne({
            $and: [
                { _id: { $ne: bonus._id } },
                {
                    $and: [
                        {
                            $or: [
                                { from: updateBonusDto.from },
                                { to: updateBonusDto.to }
                            ]
                        },
                        { department: updateBonusDto.department || bonus.department }
                    ]
                }
            ]
        });
        if (existBonus)
            throw new common_1.ConflictException('أحد أطراف الحافز مكرر');
        const inputData = {
            ...updateBonusDto,
            updatedBy: user._id
        };
        await bonus.set(inputData).save();
    }
};
exports.BonusService = BonusService;
exports.BonusService = BonusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bonus_entity_1.Bonus.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        departments_service_1.DepartmentsService])
], BonusService);
//# sourceMappingURL=bonus.service.js.map