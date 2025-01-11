import { SalaryService } from './salary.service';
import { GetSalaryDto } from './dtos/get-salary.dto';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string): Promise<{
        data: any[];
        user: UserDocument;
        error: string;
    }>;
}
