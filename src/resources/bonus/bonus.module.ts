import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from 'src/resources/departments/departments.module';
import { UsersModule } from 'src/resources/users/users.module';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { Bonus, BonusSchema } from './entities/bonus.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bonus.name,
        schema: BonusSchema
      }
    ]),
    UsersModule,
    DepartmentsModule
  ],
  controllers: [BonusController],
  providers: [BonusService],
  exports: [BonusService]
})
export class BonusModule {}
