import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from 'src/resources/departments/departments.module';
import { ProductsModule } from 'src/resources/products/products.module';
import { UsersModule } from 'src/resources/users/users.module';
import { ProductPrice, ProductPriceSchema } from './entities/product-price.entity';
import { ProductPriceController } from './product-price.controller';
import { ProductPriceService } from './product-price.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductPrice.name,
        schema: ProductPriceSchema,
      }
    ]),
    UsersModule,
    ProductsModule,
    DepartmentsModule
  ],
  controllers: [ProductPriceController],
  providers: [ProductPriceService],
  exports: [ProductPriceService]
})
export class ProductPriceModule {}
