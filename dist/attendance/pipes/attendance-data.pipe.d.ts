import { ArgumentMetadata } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { AttendanceDto } from "../dto/attendance.dto";
export declare class AttendanceDataPipe {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(data: AttendanceDto & {
        price: number;
    }, metadata: ArgumentMetadata): Promise<AttendanceDto & {
        price: number;
    }>;
}
