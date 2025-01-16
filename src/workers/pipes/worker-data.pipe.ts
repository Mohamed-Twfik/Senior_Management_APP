import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
import { Types } from 'mongoose';
import { CreateWorkerDto } from '../dto/create-worker.dto';
import { WorkerType } from '../enums/workerType.enum';

/**
 * Validates worker data.
 */
@Injectable()
export class WorkerDataPipe implements PipeTransform {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  async transform(workerData: CreateWorkerDto, metadata: ArgumentMetadata) {
    if (workerData.department) {
      const department = await this.departmentsService.findById(workerData.department.toString());
      if (!department) throw new NotFoundException('خطأ في معرف القسم.');
      workerData.department = new Types.ObjectId(workerData.department);
    }

    if (workerData.type === WorkerType.Production) workerData.salary = undefined;

    return workerData;
  }
}
