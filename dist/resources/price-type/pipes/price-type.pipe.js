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
exports.PriceTypePipe = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../../departments/departments.service");
let PriceTypePipe = class PriceTypePipe {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async transform(data, metadata) {
        for (const departmentPrice of data.departmentsPrice) {
            const departmentExists = await this.departmentsService.findById(departmentPrice.department.toString());
            if (!departmentExists)
                throw new common_1.NotAcceptableException('خطأ في معرف القسم.');
            departmentPrice.department = departmentExists._id;
        }
        return data;
    }
};
exports.PriceTypePipe = PriceTypePipe;
exports.PriceTypePipe = PriceTypePipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], PriceTypePipe);
//# sourceMappingURL=price-type.pipe.js.map