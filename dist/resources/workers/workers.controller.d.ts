import { UserDocument } from 'src/resources/users/entities/user.entity';
import { WorkerDto } from './dto/worker.dto';
import { WorkerDocument } from './entities/worker.entity';
import { WorkersService } from './workers.service';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    create(user: UserDocument, createWorkerDto: WorkerDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(worker: WorkerDocument, queryParams: any, user: UserDocument, updateWorkerDto: WorkerDto): Promise<{
        url: string;
    }>;
    remove(worker: WorkerDocument, queryParams: any): Promise<object>;
}
