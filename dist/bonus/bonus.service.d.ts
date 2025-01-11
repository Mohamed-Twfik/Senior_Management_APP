import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
export declare class BonusService extends BaseService {
    private bonusModel;
    private readonly usersService;
    private readonly departmentsService;
    searchableKeys: string[];
    constructor(bonusModel: Model<Bonus>, usersService: UsersService, departmentsService: DepartmentsService);
    getModuleModel(): Model<Bonus, {}, {}, {}, import("mongoose").Document<unknown, {}, Bonus> & Bonus & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        departments: any[];
        type: string;
        title: string;
    }>;
    create(createBonusDto: CreateBonusDto, user: UserDocument): Promise<void>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<{
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
    update(bonus: BonusDocument, updateBonusDto: UpdateBonusDto, user: UserDocument): Promise<void>;
}
