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
exports.CreateAttendanceDataPipe = void 0;
const common_1 = require("@nestjs/common");
const workerType_enum_1 = require("../../workers/enums/workerType.enum");
const workers_service_1 = require("../../workers/workers.service");
let CreateAttendanceDataPipe = class CreateAttendanceDataPipe {
    constructor(workersService) {
        this.workersService = workersService;
    }
    async transform(data, metadata) {
        data.price = [];
        if (!Array.isArray(data.worker))
            data.worker = [data.worker];
        for (let i = 0; i < data.worker.length; i++) {
            const workerExists = await this.workersService.findById(data.worker[i].toString());
            if (!workerExists)
                throw new common_1.NotAcceptableException('خطأ في معرف العامل.');
            data.worker[i] = workerExists._id;
            if (workerExists.type !== workerType_enum_1.WorkerType.Production) {
                if (!workerExists.salary)
                    throw new common_1.NotFoundException('يجب تحديد الراتب للعامل أولا.');
                data.price[i] = workerExists.salary / 6;
            }
        }
        return data;
    }
};
exports.CreateAttendanceDataPipe = CreateAttendanceDataPipe;
exports.CreateAttendanceDataPipe = CreateAttendanceDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workers_service_1.WorkersService])
], CreateAttendanceDataPipe);
//# sourceMappingURL=create-attendance-data.pipe.js.map