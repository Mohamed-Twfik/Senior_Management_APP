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
exports.BonusDataPipe = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("../../departments/departments.service");
let BonusDataPipe = class BonusDataPipe {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async transform(BonusData, metadata) {
        const department = await this.departmentsService.findById(BonusData.department.toString());
        if (!department)
            throw new common_1.NotFoundException('خطأ في معرف القسم.');
        BonusData.department = department._id;
        BonusData.to = (BonusData.to === 0) ? Infinity : BonusData.to;
        if (BonusData.from >= BonusData.to)
            throw new common_1.NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');
        return BonusData;
    }
};
exports.BonusDataPipe = BonusDataPipe;
exports.BonusDataPipe = BonusDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], BonusDataPipe);
//# sourceMappingURL=bonus-data.pipe.js.map