import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { AttendanceService } from '../attendance.service';

/**
 * Validates AttendanceId if exist.
 */
@Injectable()
export class AttendanceIdPipe implements PipeTransform {
  constructor(private readonly attendanceService: AttendanceService) { }
  
  /**
   * AttendanceId validation by get Attendance from Attendances collection.
   * 
   * @param attendanceId Attendance id
   * @param metadata metadata
   * @returns Attendance document if the Attendance is found
   */
  async transform(attendanceId: string, metadata: ArgumentMetadata) {
    const attendance = await this.attendanceService.findById(attendanceId);
    if (!attendance) throw new NotFoundException('خطأ في معرف الحضور.');
    return attendance;
  }
}
