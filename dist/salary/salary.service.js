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
const production_service_1 = require("../production/production.service");
const bonus_service_1 = require("../bonus/bonus.service");
let SalaryService = class SalaryService {
    constructor(productionService, bonusService) {
        this.productionService = productionService;
        this.bonusService = bonusService;
    }
    async getSalary(getSalaryDto, user, error) {
        const productions = await this.productionService.find({
            date: {
                $gte: getSalaryDto.from,
                $lte: getSalaryDto.to
            }
        })
            .populate('worker')
            .populate('product', 'name')
            .populate('department', 'name');
        const workerSalaries = new Map();
        productions.forEach((production) => {
            const workerId = production.worker._id.toString();
            const cost = production.cost;
        });
        const salaries = Array.from(workerSalaries.values());
        for (const salary of salaries) {
            const bonusPresent = (await this.bonusService.find({
                from: {
                    $lte: salary.salary
                },
                to: {
                    $gte: salary.salary
                }
            }))[0];
            salary.bonus = bonusPresent ? (bonusPresent.percentage / 100) * salary.salary : 0;
            salary.total = salary.salary + salary.bonus;
        }
        ;
        return { data: salaries, user, error: error || null };
    }
};
exports.SalaryService = SalaryService;
exports.SalaryService = SalaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [production_service_1.ProductionService,
        bonus_service_1.BonusService])
], SalaryService);
//# sourceMappingURL=salary.service.js.map