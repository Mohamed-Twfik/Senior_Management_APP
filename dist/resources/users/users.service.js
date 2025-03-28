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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_service_1 = require("../../utils/classes/base.service");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(usersModel, connection) {
        super();
        this.usersModel = usersModel;
        this.connection = connection;
        this.searchableKeys = [
            "username",
            "role"
        ];
    }
    getModuleModel() {
        return this.usersModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersModel.find({ role: 'مدير' }),
            type: 'users',
            title: 'المشرفين'
        };
    }
    async create(createDto, user) {
        let { username } = createDto;
        const existUser = await this.findOne({ username });
        if (existUser)
            throw new common_1.ConflictException('إسم المستخدم موجود بالفعل');
        const inputData = {
            ...createDto,
            createdBy: user._id,
            updatedBy: user._id
        };
        await this.usersModel.create(inputData);
    }
    async update(wantedUser, updateDto, user) {
        if (updateDto.username) {
            const existUser = await this.findOne({
                $and: [
                    { username: updateDto.username },
                    { _id: { $ne: wantedUser._id } }
                ]
            });
            if (existUser)
                throw new common_1.ConflictException('إسم المستخدم موجود بالفعل');
        }
        else
            delete updateDto.username;
        if (!updateDto.password)
            delete updateDto.password;
        const inputData = {
            ...updateDto,
            updatedBy: user._id
        };
        await wantedUser.set(inputData).save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], UsersService);
//# sourceMappingURL=users.service.js.map