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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const production_service_1 = require("../production/production.service");
const arabic_date_formatter_1 = require("../utils/arabic-date-formatter");
let MainService = class MainService {
    constructor(productionService) {
        this.productionService = productionService;
    }
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    ;
    async main(user) {
        const today = new Date();
        const lastSaturday = new Date(today);
        lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);
        const productsStats = await this.productionService.getProductsStats(lastSaturday, today);
        const departmentsStats = await this.productionService.getDepartmentsStats(lastSaturday, today);
        return {
            formattedToday: this.formatDate(today),
            formattedLastSaturday: this.formatDate(lastSaturday),
            arabicLastSaturday: arabic_date_formatter_1.arabicDateFormatter.format(lastSaturday),
            arabicToday: arabic_date_formatter_1.arabicDateFormatter.format(today),
            productsStats,
            departmentsStats,
            user,
            title: 'الصفحة الرئيسية',
            type: 'main',
        };
    }
};
exports.MainService = MainService;
exports.MainService = MainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [production_service_1.ProductionService])
], MainService);
//# sourceMappingURL=main.service.js.map