import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { DepartmentDto } from './dto/department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';
export declare class DepartmentsService extends BaseService {
    private departmentsModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(departmentsModel: Model<Department>, usersService: UsersService);
    getModuleModel(): Model<Department, {}, {}, {}, import("mongoose").Document<unknown, {}, Department> & Department & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        type: string;
        title: string;
    }>;
    create(createDepartmentDto: DepartmentDto, user: UserDocument): Promise<void>;
    update(department: DepartmentDocument, updateDepartmentDto: DepartmentDto, user: UserDocument): Promise<void>;
}
