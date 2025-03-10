import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from 'src/resources/departments/departments.module';
import { ProductPriceModule } from 'src/resources/product-price/product-price.module';
import { ProductsModule } from 'src/resources/products/products.module';
import { UsersModule } from 'src/resources/users/users.module';
import { WorkersModule } from 'src/resources/workers/workers.module';
import { Production, ProductionSchema } from './entities/production.entity';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Production.name,
        schema: ProductionSchema,
      },
    ]),
    UsersModule,
    ProductPriceModule,
    ProductsModule,
    WorkersModule,
    DepartmentsModule
  ],
  controllers: [ProductionController],
  providers: [ProductionService],
  exports: [ProductionService],
})
export class ProductionModule {}
