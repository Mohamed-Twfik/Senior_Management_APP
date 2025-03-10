import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductionService } from "src/resources/production/production.service";
import { AttendanceService } from "src/resources/attendance/attendance.service";
import { UserDocument } from "src/resources/users/entities/user.entity";
import { BonusService } from '../bonus/bonus.service';
import { GetSalaryDto } from './dto/get-salary.dto';
export declare class SalaryService {
    private readonly productionService;
    private readonly attendanceService;
    private readonly bonusService;
    private readonly departmentsService;
    constructor(productionService: ProductionService, attendanceService: AttendanceService, bonusService: BonusService, departmentsService: DepartmentsService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument): Promise<{
        productionWorkers: any[];
        productionSum: {
            totalPrice: number;
            totalSalary: number;
            bonus: number;
        };
        attendanceWorkers: any[];
        attendanceSum: number;
        fromDate: string;
        toDate: string;
        salaryForm: {
            from: string;
            to: string;
        };
        arabicFromDate: string;
        arabicToDate: string;
        user: UserDocument;
        type: string;
        title: string;
    }>;
}
