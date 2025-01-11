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
const salary_service_1 = require("./salary.service");
const salary_controller_1 = require("./salary.controller");
const production_module_1 = require("../production/production.module");
const bonus_module_1 = require("../bonus/bonus.module");
let SalaryModule = class SalaryModule {
};
exports.SalaryModule = SalaryModule;
exports.SalaryModule = SalaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            production_module_1.ProductionModule,
            bonus_module_1.BonusModule
        ],
        controllers: [salary_controller_1.SalaryController],
        providers: [salary_service_1.SalaryService],
    })
], SalaryModule);
//# sourceMappingURL=salary.module.js.map