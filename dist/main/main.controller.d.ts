import { UserDocument } from 'src/resources/users/entities/user.entity';
import { MainService } from './main.service';
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    root(user: UserDocument): Promise<{
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
