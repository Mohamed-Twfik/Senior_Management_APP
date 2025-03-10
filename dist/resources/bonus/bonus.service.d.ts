import { Model } from 'mongoose';
import { DepartmentsService } from 'src/resources/departments/departments.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { BonusDto } from './dto/bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
export declare class BonusService extends BaseService {
    private bonusModel;
    private readonly usersService;
    private readonly departmentsService;
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
    create(createBonusDto: BonusDto, user: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(bonus: BonusDocument, updateBonusDto: BonusDto, user: UserDocument): Promise<void>;
}
