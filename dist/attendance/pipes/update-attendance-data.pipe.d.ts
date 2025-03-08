import { ArgumentMetadata } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { UpdateAttendanceDto } from "../dto/update-attendance.dto";
export declare class UpdateAttendanceDataPipe {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(data: UpdateAttendanceDto & {
        price: number;
    }, metadata: ArgumentMetadata): Promise<UpdateAttendanceDto & {
        price: number;
    }>;
}
