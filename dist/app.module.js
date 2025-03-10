"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./resources/auth/auth.module");
const un_auth_filter_1 = require("./resources/auth/filters/un-auth.filter");
const roles_guard_1 = require("./resources/auth/guards/roles.guard");
const bonus_module_1 = require("./resources/bonus/bonus.module");
const departments_module_1 = require("./resources/departments/departments.module");
const fall_back_module_1 = require("./fall-back/fall-back.module");
const main_module_1 = require("./main/main.module");
const price_type_module_1 = require("./resources/price-type/price-type.module");
const product_category_module_1 = require("./resources/product-category/product-category.module");
const product_price_module_1 = require("./resources/product-price/product-price.module");
const production_module_1 = require("./resources/production/production.module");
const products_module_1 = require("./resources/products/products.module");
const attendance_module_1 = require("./resources/attendance/attendance.module");
const salary_module_1 = require("./resources/salary/salary.module");
const users_module_1 = require("./resources/users/users.module");
const envValidation_schema_1 = require("./utils/config/envValidation.schema");
const loggerException_filter_1 = require("./utils/logger/filters/loggerException.filter");
const logger_module_1 = require("./utils/logger/logger.module");
const requestTiming_middleware_1 = require("./utils/middlewares/requestTiming.middleware");
const workers_module_1 = require("./resources/workers/workers.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(requestTiming_middleware_1.RequestTimingMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                validationSchema: envValidation_schema_1.envVariablesValidationSchema,
                isGlobal: true,
                expandVariables: true
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => [{
                        ttl: configService.get("THROTTLE_TTL"),
                        limit: configService.get("THROTTLE_LIMIT")
                    }],
                inject: [config_1.ConfigService]
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get("DB_URI")
                }),
                inject: [config_1.ConfigService]
            }),
            logger_module_1.LoggerModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            workers_module_1.WorkersModule,
            products_module_1.ProductsModule,
            departments_module_1.DepartmentsModule,
            bonus_module_1.BonusModule,
            product_price_module_1.ProductPriceModule,
            production_module_1.ProductionModule,
            attendance_module_1.AttendanceModule,
            salary_module_1.SalaryModule,
            main_module_1.MainModule,
            product_category_module_1.ProductCategoryModule,
            price_type_module_1.PriceTypeModule,
            fall_back_module_1.FallBackModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
                })
            },
            {
                provide: core_1.APP_FILTER,
                useClass: loggerException_filter_1.LoggerExceptionFilter
            },
            {
                provide: core_1.APP_FILTER,
                useClass: un_auth_filter_1.UnauthorizedFilter
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map