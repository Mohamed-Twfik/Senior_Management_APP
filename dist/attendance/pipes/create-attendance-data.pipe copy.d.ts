import { ArgumentMetadata } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { AttendanceDto } from "../dto/create-attendance.dto";
export declare class CreateAttendanceDataPipe {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(data: AttendanceDto & {
        price: number;
    }, metadata: ArgumentMetadata): Promise<any>;
}
