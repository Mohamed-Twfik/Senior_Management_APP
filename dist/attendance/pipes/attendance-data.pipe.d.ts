import { ArgumentMetadata } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { CreateAttendanceDto } from "../dto/create-attendance.dto";
export declare class AttendanceDataPipe {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(data: CreateAttendanceDto, metadata: ArgumentMetadata): CreateAttendanceDto;
}
