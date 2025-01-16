import { Module } from "@nestjs/common";
import { SalaryController } from "./salary.controller";
import { SalaryService } from "./salary.service";
import { DepartmentsModule } from "src/departments/departments.module";
import { BonusModule } from "src/bonus/bonus.module";
import { AttendanceModule } from "src/attendance/attendance.module";
import { ProductionModule } from "src/production/production.module";

@Module({
  imports: [
    DepartmentsModule,
    BonusModule,
    AttendanceModule,
    ProductionModule
  ],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}