import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { ProductionModule } from '../resources/production/production.module';

@Module({
  imports: [
    ProductionModule
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
