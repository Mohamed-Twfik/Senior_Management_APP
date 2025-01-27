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
exports.SalaryService = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("../attendance/attendance.service");
const production_service_1 = require("../production/production.service");
const bonus_service_1 = require("../bonus/bonus.service");
const departments_service_1 = require("../departments/departments.service");
const arabic_date_formatter_1 = require("../utils/arabic-date-formatter");
let SalaryService = class SalaryService {
    constructor(productionService, attendanceService, bonusService, departmentsService) {
        this.productionService = productionService;
        this.attendanceService = attendanceService;
        this.bonusService = bonusService;
        this.departmentsService = departmentsService;
    }
    async getSalary(getSalaryDto, user) {
        const attendanceWorkers = await this.attendanceService.getSalaryData(getSalaryDto.from, getSalaryDto.to);
        const productionWorkers = await this.productionService.getSalaryData(getSalaryDto.from, getSalaryDto.to);
        for (const worker of productionWorkers) {
            worker.bonus = 0;
            const bonusPresent = await this.bonusService.findOne({
                from: { $lte: worker.totalPrice },
                to: { $gte: worker.totalPrice },
                department: worker.department
            });
            const department = await this.departmentsService.findById(worker.department);
            if (bonusPresent) {
                let bonus = Math.ceil((bonusPresent.percentage / 100) * worker.totalPrice);
                worker.bonus = (bonus > department.bonusLimit) ? department.bonusLimit : bonus;
            }
            worker.totalSalary = worker.totalPrice + worker.bonus;
        }
        ;
        const renderData = {
            productionWorkers,
            attendanceWorkers,
            fromDate: getSalaryDto.from,
            toDate: getSalaryDto.to,
            arabicFromDate: arabic_date_formatter_1.arabicDateFormatter.format(getSalaryDto.from),
            arabicToDate: arabic_date_formatter_1.arabicDateFormatter.format(getSalaryDto.to),
            user,
            type: 'salary',
            title: 'المرتبات'
        };
        return renderData;
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [production_service_1.ProductionService,
        attendance_service_1.AttendanceService,
        bonus_service_1.BonusService,
        departments_service_1.DepartmentsService])
], SalaryService);
//# sourceMappingURL=salary.service.js.map