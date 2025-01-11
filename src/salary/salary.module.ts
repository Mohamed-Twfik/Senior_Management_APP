import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { ProductionModule } from 'src/production/production.module';
import { BonusModule } from 'src/bonus/bonus.module';

@Module({
  imports: [
    ProductionModule,
    BonusModule
  ],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
