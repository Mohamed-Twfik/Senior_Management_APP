import { UserDocument } from 'src/users/entities/user.entity';
import { BonusService } from './bonus.service';
import { BonusDto } from './dto/bonus.dto';
import { BonusDocument } from './entities/bonus.entity';
export declare class BonusController {
    private readonly bonusService;
    constructor(bonusService: BonusService);
    create(createBonusDto: BonusDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<{
        users: any[];
        departments: any[];
        type: string;
        title: string;
        error: string | null;
        data: Array<any> | null;
        user: UserDocument;
        filters: {
            [key: string]: any;
            search: string;
            sort: string;
            pagination: {
                page: number;
                pageSize: number;
                totalPages: number;
            };
        };
    }>;
    update(bonus: BonusDocument, updateBonusDto: BonusDto, user: UserDocument): Promise<void>;
    remove(bonus: BonusDocument): Promise<void>;
}
