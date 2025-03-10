import { Module } from "@nestjs/common";
import { BonusModule } from "src/resources/bonus/bonus.module";
import { DepartmentsModule } from "src/resources/departments/departments.module";
import { ProductionModule } from "src/resources/production/production.module";
import { AttendanceModule } from "src/resources/attendance/attendance.module";
import { SalaryController } from "./salary.controller";
import { SalaryService } from "./salary.service";

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