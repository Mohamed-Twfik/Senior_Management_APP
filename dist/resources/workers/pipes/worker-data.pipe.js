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
exports.WorkerDataPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const departments_service_1 = require("../../departments/departments.service");
const workerType_enum_1 = require("../enums/workerType.enum");
let WorkerDataPipe = class WorkerDataPipe {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async transform(workerData, metadata) {
        const department = await this.departmentsService.findById(workerData.department.toString());
        if (!department)
            throw new common_1.NotFoundException('خطأ في معرف القسم.');
        workerData.department = new mongoose_1.Types.ObjectId(workerData.department);
        if (workerData.type === workerType_enum_1.WorkerType.Production)
            workerData.salary = undefined;
        return workerData;
    }
};
exports.WorkerDataPipe = WorkerDataPipe;
exports.WorkerDataPipe = WorkerDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], WorkerDataPipe);
//# sourceMappingURL=worker-data.pipe.js.map