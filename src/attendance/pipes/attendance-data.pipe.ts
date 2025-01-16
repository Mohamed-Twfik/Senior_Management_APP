import { ArgumentMetadata, Injectable, NotAcceptableException } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { CreateAttendanceDto } from "../dto/create-attendance.dto";
import { Types } from "mongoose";

/**
 * Create Attendance pipe.
 */
@Injectable()
export class AttendanceDataPipe {
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
  transform(data: CreateAttendanceDto, metadata: ArgumentMetadata) {
    if (data.worker) {
      const workerExists = this.workersService.findById(data.worker.toString());
      if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
      data.worker = new Types.ObjectId(data.worker);
    }

    return data;
  }
}