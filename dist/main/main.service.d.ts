import { ProductionService } from 'src/resources/production/production.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
export declare class MainService {
    private readonly productionService;
    constructor(productionService: ProductionService);
    main(user: UserDocument): Promise<{
        formattedToday: string;
        formattedLastSaturday: string;
        arabicLastSaturday: string;
        arabicToday: string;
        salaryForm: {
            from: string;
            to: string;
        };
        productsStats: any[];
        departmentsStats: any[];
        user: UserDocument;
        title: string;
        type: string;
    }>;
}
