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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const base_service_1 = require("../../utils/classes/base.service");
const workerType_enum_1 = require("../workers/enums/workerType.enum");
const workers_service_1 = require("../workers/workers.service");
const attendance_entity_1 = require("./entities/attendance.entity");
let AttendanceService = class AttendanceService extends base_service_1.BaseService {
    constructor(attendanceModel, usersService, workersService) {
        super();
        this.attendanceModel = attendanceModel;
        this.usersService = usersService;
        this.workersService = workersService;
    }
    getModuleModel() {
        return this.attendanceModel;
    }
    async getAdditionalRenderVariables() {
        return {
            users: await this.usersService.find(),
            workers: await this.workersService.find(),
            type: 'attendance',
            title: 'الحضور'
        };
    }
    async create(createDto, userDocument) {
        const inputData = [];
        for (let i = 0; i < createDto.worker.length; i++) {
            const existAttendance = await this.attendanceModel.findOne({ worker: createDto.worker[i], date: createDto.date });
            if (existAttendance)
                continue;
            inputData.push({
                date: createDto.date,
                worker: createDto.worker[i],
                price: createDto.price[i],
                createdBy: userDocument._id,
                updatedBy: userDocument._id
            });
        }
        ;
        await this.attendanceModel.create(inputData);
    }
    applyFilters(queryBuilder) {
        return super.applyFilters(queryBuilder).populate('worker', 'name');
    }
    async update(entity, updateDto, userDocument) {
        const existAttendance = await this.attendanceModel.findOne({ worker: updateDto.worker, date: updateDto.date, _id: { $ne: entity._id } });
        if (existAttendance)
            throw new common_1.ConflictException('تم إضافة حضور العامل مسبقا.');
        const inputData = {
            ...updateDto,
            updatedBy: userDocument._id
        };
        await entity.set(inputData).save();
    }
    async getSalaryData(startDate, endDate) {
        const workers = await this.attendanceModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $lookup: {
                    from: 'workers',
                    localField: 'worker',
                    foreignField: '_id',
                    as: 'workerDetails',
                },
            },
            {
                $unwind: '$workerDetails',
            },
            {
                $match: {
                    'workerDetails.type': { $ne: workerType_enum_1.WorkerType.Production },
                },
            },
            {
                $group: {
                    _id: '$worker',
                    totalPrice: { $sum: { $ifNull: ['$price', 0] } },
                    name: { $first: '$workerDetails.name' },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    totalPrice: 1,
                },
            },
        ]);
        return workers;
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_entity_1.Attendance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        workers_service_1.WorkersService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map