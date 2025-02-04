import { ProductionService } from 'src/production/production.service';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class MainService {
    private readonly productionService;
    constructor(productionService: ProductionService);
    private formatDate;
    main(user: UserDocument): Promise<{
        formattedToday: string;
        formattedLastSaturday: string;
        arabicLastSaturday: string;
        arabicToday: string;
        productsStats: any[];
        departmentsStats: any[];
        user: UserDocument;
        title: string;
        type: string;
    }>;
}
