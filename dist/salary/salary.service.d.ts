import { BonusService } from 'src/bonus/bonus.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetSalaryDto } from '../production/dto/get-salary.dto';
import { ProductionService } from '../production/production.service';
export declare class SalaryService {
    private readonly productionService;
    private readonly bonusService;
    constructor(productionService: ProductionService, bonusService: BonusService);
    getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string): Promise<{
        data: any[];
        user: UserDocument;
        error: string;
    }>;
}
