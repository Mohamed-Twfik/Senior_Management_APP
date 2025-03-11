import {
    HttpStatus,
    MiddlewareConsumer,
    Module,
    ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AuthModule } from './resources/auth/auth.module';
import { UnauthorizedFilter } from './resources/auth/filters/un-auth.filter';
import { RolesGuard } from './resources/auth/guards/roles.guard';
import { BonusModule } from './resources/bonus/bonus.module';
import { DepartmentsModule } from './resources/departments/departments.module';
import { FallBackModule } from './fall-back/fall-back.module';
import { MainModule } from './main/main.module';
import { PriceTypeModule } from './resources/price-type/price-type.module';
import { ProductCategoryModule } from './resources/product-category/product-category.module';
import { ProductionModule } from './resources/production/production.module';
import { ProductsModule } from './resources/products/products.module';
import { AttendanceModule } from './resources/attendance/attendance.module';
import { SalaryModule } from './resources/salary/salary.module';
import { UsersModule } from './resources/users/users.module';
import { envVariablesValidationSchema } from './utils/config/envValidation.schema';
import { LoggerExceptionFilter } from './utils/logger/filters/loggerException.filter';
import { LoggerModule } from './utils/logger/logger.module';
import { RequestTimingMiddleware } from './utils/middlewares/requestTiming.middleware';
import { WorkersModule } from './resources/workers/workers.module';
import { ClientsModule } from './resources/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: envVariablesValidationSchema,
      isGlobal: true,
      expandVariables: true
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [{
        ttl: configService.get<number>("THROTTLE_TTL"),
        limit: configService.get<number>("THROTTLE_LIMIT")
      }],
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DB_URI")
      }),
      inject: [ConfigService]
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    WorkersModule,
    ProductsModule,
    DepartmentsModule,
    BonusModule,
    ProductionModule,
    AttendanceModule,
    SalaryModule,
    MainModule,
    ProductCategoryModule,
    PriceTypeModule,
    ClientsModule,
    FallBackModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      })
    },
    {
      provide: APP_FILTER,
      useClass: LoggerExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimingMiddleware).forRoutes('*');
  }
}
