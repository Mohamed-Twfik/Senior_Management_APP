"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryModule = void 0;
const common_1 = require("@nestjs/common");
const salary_controller_1 = require("./salary.controller");
const salary_service_1 = require("./salary.service");
const departments_module_1 = require("../departments/departments.module");
const bonus_module_1 = require("../bonus/bonus.module");
const attendance_module_1 = require("../attendance/attendance.module");
const production_module_1 = require("../production/production.module");
let SalaryModule = class SalaryModule {
};
exports.SalaryModule = SalaryModule;
exports.SalaryModule = SalaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            departments_module_1.DepartmentsModule,
            bonus_module_1.BonusModule,
            attendance_module_1.AttendanceModule,
            production_module_1.ProductionModule
        ],
        controllers: [salary_controller_1.SalaryController],
        providers: [salary_service_1.SalaryService],
    })
], SalaryModule);
//# sourceMappingURL=salary.module.js.map