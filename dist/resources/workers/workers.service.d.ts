import { Model } from 'mongoose';
import { DepartmentsService } from 'src/resources/departments/departments.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { WorkerDto } from './dto/worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
export declare class WorkersService extends BaseService {
    private workersModel;
    private readonly usersService;
    private readonly departmentsService;
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
    create(createWorkerDto: WorkerDto, user: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(worker: WorkerDocument, updateWorkerDto: WorkerDto, user: UserDocument): Promise<void>;
}
