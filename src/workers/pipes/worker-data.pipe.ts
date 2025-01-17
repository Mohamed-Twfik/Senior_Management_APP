import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { Types } from 'mongoose';
import { DepartmentsService } from '../../departments/departments.service';
import { WorkerDto } from '../dto/worker.dto';
import { WorkerType } from '../enums/workerType.enum';

/**
 * Validates worker data.
 */
@Injectable()
export class WorkerDataPipe implements PipeTransform {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  async transform(workerData: WorkerDto, metadata: ArgumentMetadata) {
    const department = await this.departmentsService.findById(workerData.department.toString());
    if (!department) throw new NotFoundException('خطأ في معرف القسم.');
    workerData.department = new Types.ObjectId(workerData.department);

    if (workerData.type === WorkerType.Production) workerData.salary = undefined;

    return workerData;
  }
}
