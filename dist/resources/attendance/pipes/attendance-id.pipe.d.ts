import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { AttendanceService } from '../attendance.service';
export declare class AttendanceIdPipe implements PipeTransform {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    transform(attendanceId: string, metadata: ArgumentMetadata): Promise<any>;
}
