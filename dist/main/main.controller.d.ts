import { MainService } from './main.service';
import { UserDocument } from 'src/users/entities/user.entity';
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
