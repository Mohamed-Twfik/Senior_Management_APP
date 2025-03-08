import { ArgumentMetadata, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { WorkerType } from "src/workers/enums/workerType.enum";
import { WorkersService } from '../../workers/workers.service';
import { CreateAttendanceDto } from "../dto/create-attendance.dto";

/**
 * Create Attendance pipe.
 */
@Injectable()
export class CreateAttendanceDataPipe {
  constructor(
    private readonly workersService: WorkersService,
  ) { }
  /**
   * Transform Attendance data to save it in the database.
   * 
   * @param data Attendance  data
   * @param metadata metadata
   * @returns transformed Attendance  data
   */
  async transform(data: CreateAttendanceDto & { price: number[] }, metadata: ArgumentMetadata) {
    data.price = [];
    for (let i = 0; i < data.worker.length; i++) {
      const workerExists = await this.workersService.findById(data.worker[i].toString());
      if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
      data.worker[i] = workerExists._id;
      if (workerExists.type !== WorkerType.Production) {
        if (!workerExists.salary) throw new NotFoundException('يجب تحديد الراتب للعامل أولا.');
        data.price[i] = workerExists.salary / 6;
      }
    }
    return data;
  }
}