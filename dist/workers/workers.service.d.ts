import { Model } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
export declare class WorkersService extends BaseService {
    private workersModel;
    private readonly usersService;
    private readonly departmentsService;
    searchableKeys: string[];
    constructor(workersModel: Model<Worker>, usersService: UsersService, departmentsService: DepartmentsService);
    getModuleModel(): Model<Worker, {}, {}, {}, import("mongoose").Document<unknown, {}, Worker> & Worker & {
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
    create(createWorkerDto: CreateWorkerDto, user: UserDocument): Promise<void>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType>;
    update(worker: WorkerDocument, updateWorkerDto: UpdateWorkerDto, user: UserDocument): Promise<void>;
}
