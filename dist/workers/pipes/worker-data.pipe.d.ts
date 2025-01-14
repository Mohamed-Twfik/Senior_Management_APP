import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
import { CreateWorkerDto } from '../dto/create-worker.dto';
export declare class WorkerDataPipe implements PipeTransform {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(workerData: CreateWorkerDto, metadata: ArgumentMetadata): Promise<CreateWorkerDto>;
}
