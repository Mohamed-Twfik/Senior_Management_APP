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
exports.PriceTypeIdPipe = void 0;
const common_1 = require("@nestjs/common");
const price_type_service_1 = require("../price-type.service");
let PriceTypeIdPipe = class PriceTypeIdPipe {
    constructor(priceTypeService) {
        this.priceTypeService = priceTypeService;
    }
    async transform(priceTypeId, metadata) {
        const priceType = await this.priceTypeService.findById(priceTypeId);
        if (!priceType)
            throw new common_1.NotFoundException('خطأ في معرف نوع السعر.');
        return priceType;
    }
};
exports.PriceTypeIdPipe = PriceTypeIdPipe;
exports.PriceTypeIdPipe = PriceTypeIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [price_type_service_1.PriceTypeService])
], PriceTypeIdPipe);
//# sourceMappingURL=price-type-id.pipe.js.map