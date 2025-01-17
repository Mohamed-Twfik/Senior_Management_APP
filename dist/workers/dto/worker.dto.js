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
exports.WorkerDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
const workerType_enum_1 = require("../enums/workerType.enum");
class WorkerDto {
}
exports.WorkerDto = WorkerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(workerType_enum_1.WorkerType),
    __metadata("design:type", String)
], WorkerDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], WorkerDto.prototype, "department", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => (o.type === workerType_enum_1.WorkerType.Weekly || o.type === workerType_enum_1.WorkerType.Hybrid)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], WorkerDto.prototype, "salary", void 0);
//# sourceMappingURL=worker.dto.js.map