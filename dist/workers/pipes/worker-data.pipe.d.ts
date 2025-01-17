import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
import { WorkerDto } from '../dto/worker.dto';
export declare class WorkerDataPipe implements PipeTransform {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(workerData: WorkerDto, metadata: ArgumentMetadata): Promise<WorkerDto>;
}
