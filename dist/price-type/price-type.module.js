"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTypeModule = void 0;
const common_1 = require("@nestjs/common");
const price_type_service_1 = require("./price-type.service");
const price_type_controller_1 = require("./price-type.controller");
const mongoose_1 = require("@nestjs/mongoose");
const price_type_entity_1 = require("./entities/price-type.entity");
const users_module_1 = require("../users/users.module");
const departments_module_1 = require("../departments/departments.module");
let PriceTypeModule = class PriceTypeModule {
};
exports.PriceTypeModule = PriceTypeModule;
exports.PriceTypeModule = PriceTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: price_type_entity_1.PriceType.name,
                    schema: price_type_entity_1.PriceTypeSchema,
                },
            ]),
            users_module_1.UsersModule,
            departments_module_1.DepartmentsModule
        ],
        controllers: [price_type_controller_1.PriceTypeController],
        providers: [price_type_service_1.PriceTypeService],
        exports: [price_type_service_1.PriceTypeService]
    })
], PriceTypeModule);
//# sourceMappingURL=price-type.module.js.map