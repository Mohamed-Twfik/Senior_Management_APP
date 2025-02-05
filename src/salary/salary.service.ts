import { Injectable } from "@nestjs/common";
import { AttendanceService } from "src/attendance/attendance.service";
import { ProductionService } from "src/production/production.service";
import { GetSalaryDto } from './dto/get-salary.dto';
import { UserDocument } from "src/users/entities/user.entity";
import { BonusService } from '../bonus/bonus.service';
import { DepartmentsService } from "src/departments/departments.service";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";
import { formatDate, lastSaturdayFormatted, todayFormatted } from "src/utils/input-field-date-format";

@Injectable()
export class SalaryService {
  constructor(
    private readonly productionService: ProductionService,
    private readonly attendanceService: AttendanceService,
    private readonly bonusService: BonusService,
    private readonly departmentsService: DepartmentsService
  ) { }
  
  async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument) {
    const attendanceWorkers = await this.attendanceService.getSalaryData(getSalaryDto.from, getSalaryDto.to);
    const productionWorkers = await this.productionService.getSalaryData(getSalaryDto.from, getSalaryDto.to);

    const attendanceSum = attendanceWorkers.reduce((acc, worker) => acc + worker.totalPrice, 0);

    const productionSum = {
      totalPrice: 0,
      totalSalary: 0,
      bonus: 0
    };
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
        productionSum.bonus += worker.bonus;
      }
      worker.totalPrice = Math.ceil(worker.totalPrice);
      worker.totalSalary = worker.totalPrice + worker.bonus;
      productionSum.totalPrice += worker.totalPrice;
      productionSum.totalSalary += worker.totalSalary;
    };

    const renderData = {
      productionWorkers,
      productionSum,
      attendanceWorkers,
      attendanceSum,
      fromDate: formatDate(getSalaryDto.from),
      toDate: formatDate(getSalaryDto.to),
      salaryForm: {
        from: lastSaturdayFormatted,
        to: todayFormatted
      },
      arabicFromDate: arabicDateFormatter.format(getSalaryDto.from),
      arabicToDate: arabicDateFormatter.format(getSalaryDto.to),
      user,
      type: 'salary',
      title: 'المرتبات'
    };
    return renderData;
  }
}