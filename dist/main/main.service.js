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
const input_field_date_format_1 = require("../utils/input-field-date-format");
let MainService = class MainService {
    constructor(productionService) {
        this.productionService = productionService;
    }
    async main(user) {
        const productsStats = await this.productionService.getProductsStats(input_field_date_format_1.lastSaturday, input_field_date_format_1.today);
        const departmentsStats = await this.productionService.getDepartmentsStats(input_field_date_format_1.lastSaturday, input_field_date_format_1.today);
        return {
            formattedToday: input_field_date_format_1.todayFormatted,
            formattedLastSaturday: input_field_date_format_1.lastSaturdayFormatted,
            arabicLastSaturday: arabic_date_formatter_1.arabicDateFormatter.format(input_field_date_format_1.lastSaturday),
            arabicToday: arabic_date_formatter_1.arabicDateFormatter.format(input_field_date_format_1.today),
            salaryForm: {
                from: input_field_date_format_1.lastSaturdayFormatted,
                to: input_field_date_format_1.todayFormatted
            },
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