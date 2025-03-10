import { GetSalaryDto } from "src/resources/salary/dto/get-salary.dto";
import { UserDocument } from "src/resources/users/entities/user.entity";
import { SalaryService } from './salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
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
