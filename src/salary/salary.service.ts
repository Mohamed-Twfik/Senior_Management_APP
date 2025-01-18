import { Injectable } from "@nestjs/common";
import { AttendanceService } from "src/attendance/attendance.service";
import { ProductionService } from "src/production/production.service";
import { GetSalaryDto } from './dto/get-salary.dto';
import { UserDocument } from "src/users/entities/user.entity";
import { BonusService } from '../bonus/bonus.service';
import { DepartmentsService } from "src/departments/departments.service";

@Injectable()
export class SalaryService {
  constructor(
    private readonly productionService: ProductionService,
    private readonly attendanceService: AttendanceService,
    private readonly bonusService: BonusService,
    private readonly departmentsService: DepartmentsService
  ) { }
  
  async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument) {
    console.log('getSalaryDto', getSalaryDto);
    const attendanceWorkers = await this.attendanceService.getSalaryData(getSalaryDto.from, getSalaryDto.to);
    const productionWorkers = await this.productionService.getSalaryData(getSalaryDto.from, getSalaryDto.to);

    for (const worker of productionWorkers) {
      worker.bonus = 0;
      const bonusPresent = await this.bonusService.findOne({
        from: { $lte: worker.totalPrice },
        to: { $gte: worker.totalPrice },
        department: worker.department
      });
      const department = await this.departmentsService.findById(worker.department);
      if (bonusPresent) {
        let bonus = Math.ceil((bonusPresent.percentage / 100) * worker.totalPrice);
        worker.bonus = (bonus > department.bonusLimit) ? department.bonusLimit : bonus;
      }
      worker.totalSalary = worker.totalPrice + worker.bonus;
    };

    const renderData = { productionWorkers, attendanceWorkers, user, type: 'salary', title: 'المرتبات' };
    return renderData;
  }
}