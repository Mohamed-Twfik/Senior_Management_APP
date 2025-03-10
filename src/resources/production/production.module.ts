import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from 'src/resources/departments/departments.module';
import { ProductsModule } from 'src/resources/products/products.module';
import { UsersModule } from 'src/resources/users/users.module';
import { WorkersModule } from 'src/resources/workers/workers.module';
import { Production, ProductionSchema } from './entities/production.entity';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';
import { PriceTypeModule } from '../price-type/price-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Production.name,
        schema: ProductionSchema,
      },
    ]),
    UsersModule,
    ProductsModule,
    WorkersModule,
    DepartmentsModule,
    PriceTypeModule
  ],
  controllers: [ProductionController],
  providers: [ProductionService],
  exports: [ProductionService],
})
export class ProductionModule {}
