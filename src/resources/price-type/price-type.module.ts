import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from 'src/resources/departments/departments.module';
import { UsersModule } from 'src/resources/users/users.module';
import { PriceType, PriceTypeSchema } from './entities/price-type.entity';
import { PriceTypeController } from './price-type.controller';
import { PriceTypeService } from './price-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PriceType.name,
        schema: PriceTypeSchema,
      },
    ]),
    UsersModule,
    DepartmentsModule
  ],
  controllers: [PriceTypeController],
  providers: [PriceTypeService],
  exports: [PriceTypeService]
})
export class PriceTypeModule {}
