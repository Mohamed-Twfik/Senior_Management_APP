import { UserDocument } from 'src/users/entities/user.entity';
import { GetSalaryDto } from '../production/dto/get-salary.dto';
import { SalaryService } from './salary.service';
export declare class SalaryController {
    private readonly salaryService;
    constructor(salaryService: SalaryService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string): Promise<{
        data: any[];
        user: UserDocument;
        error: string;
    }>;
}
