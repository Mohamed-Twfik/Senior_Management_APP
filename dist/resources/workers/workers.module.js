"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const departments_module_1 = require("../departments/departments.module");
const users_module_1 = require("../users/users.module");
const worker_entity_1 = require("./entities/worker.entity");
const workers_controller_1 = require("./workers.controller");
const workers_service_1 = require("./workers.service");
let WorkersModule = class WorkersModule {
};
exports.WorkersModule = WorkersModule;
exports.WorkersModule = WorkersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: worker_entity_1.Worker.name,
                    schema: worker_entity_1.WorkerSchema,
                },
            ]),
            users_module_1.UsersModule,
            departments_module_1.DepartmentsModule
        ],
        controllers: [workers_controller_1.WorkersController],
        providers: [workers_service_1.WorkersService],
        exports: [workers_service_1.WorkersService]
    })
], WorkersModule);
//# sourceMappingURL=workers.module.js.map