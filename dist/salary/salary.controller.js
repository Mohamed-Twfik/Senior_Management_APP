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
exports.SalaryController = void 0;
const common_1 = require("@nestjs/common");
const get_salary_dto_1 = require("./dto/get-salary.dto");
const salary_service_1 = require("./salary.service");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
let SalaryController = class SalaryController {
    constructor(salaryService) {
        this.salaryService = salaryService;
    }
    async getSalary(getSalaryDto, user) {
        return this.salaryService.getSalary(getSalaryDto, user);
    }
};
exports.SalaryController = SalaryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_salary_dto_1.GetSalaryDto, Object]),
    __metadata("design:returntype", Promise)
], SalaryController.prototype, "getSalary", null);
exports.SalaryController = SalaryController = __decorate([
    (0, common_1.Controller)('salary'),
    __metadata("design:paramtypes", [salary_service_1.SalaryService])
], SalaryController);
//# sourceMappingURL=salary.controller.js.map