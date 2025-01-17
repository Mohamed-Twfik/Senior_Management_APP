import { GetSalaryDto } from "src/salary/dto/get-salary.dto";
import { SalaryService } from './salary.service';
import { UserDocument } from "src/users/entities/user.entity";
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument): Promise<{
        productionWorkers: any[];
        attendanceWorkers: any[];
        user: UserDocument;
        type: string;
        title: string;
    }>;
}
