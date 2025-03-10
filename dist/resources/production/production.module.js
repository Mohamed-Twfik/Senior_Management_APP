"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const departments_module_1 = require("../departments/departments.module");
const products_module_1 = require("../products/products.module");
const users_module_1 = require("../users/users.module");
const workers_module_1 = require("../workers/workers.module");
const production_entity_1 = require("./entities/production.entity");
const production_controller_1 = require("./production.controller");
const production_service_1 = require("./production.service");
const price_type_module_1 = require("../price-type/price-type.module");
let ProductionModule = class ProductionModule {
};
exports.ProductionModule = ProductionModule;
exports.ProductionModule = ProductionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: production_entity_1.Production.name,
                    schema: production_entity_1.ProductionSchema,
                },
            ]),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            workers_module_1.WorkersModule,
            departments_module_1.DepartmentsModule,
            price_type_module_1.PriceTypeModule
        ],
        controllers: [production_controller_1.ProductionController],
        providers: [production_service_1.ProductionService],
        exports: [production_service_1.ProductionService],
    })
], ProductionModule);
//# sourceMappingURL=production.module.js.map