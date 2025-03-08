import { ArgumentMetadata, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { WorkerType } from "src/workers/enums/workerType.enum";
import { WorkersService } from '../../workers/workers.service';
import { UpdateAttendanceDto } from "../dto/update-attendance.dto";

/**
 * Create Attendance pipe.
 */
@Injectable()
export class UpdateAttendanceDataPipe {
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
  async transform(data: UpdateAttendanceDto & { price: number }, metadata: ArgumentMetadata) {
    if (data.worker) {
      const workerExists = await this.workersService.findById(data.worker.toString());
      if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
      data.worker = workerExists._id;
      if (workerExists.type !== WorkerType.Production) {
        if (!workerExists.salary) throw new NotFoundException('يجب تحديد الراتب للعامل أولا.');
        data.price = workerExists.salary / 6;
      }
    }
    return data;
  }
}