import { MainService } from './main.service';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    root(user: UserDocument): {
        user: UserDocument;
        title: string;
        type: string;
    };
}
