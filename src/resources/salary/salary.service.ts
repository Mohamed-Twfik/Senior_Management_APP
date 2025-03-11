import { Injectable } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductionService } from "src/resources/production/production.service";
import { AttendanceService } from "src/resources/attendance/attendance.service";
import { UserDocument } from "src/resources/users/entities/user.entity";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";
import { formatDate, lastSaturdayFormatted, todayFormatted } from "src/utils/input-field-date-format";
import { BonusService } from '../bonus/bonus.service';
import { GetSalaryDto } from './dto/get-salary.dto';

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

    let attendanceSum = 0;
    for (const worker of attendanceWorkers) {
      worker.totalPrice = Math.ceil(worker.totalPrice);
      // Round up to the nearest 5
      worker.totalPrice = worker.totalPrice - (worker.totalPrice % 5) + 5;
      attendanceSum += worker.totalPrice;
    }

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
      // Round up to the nearest 5
      worker.totalSalary = worker.totalSalary - (worker.totalSalary % 5) + 5;
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