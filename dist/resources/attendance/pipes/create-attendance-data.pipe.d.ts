import { ArgumentMetadata } from "@nestjs/common";
import { WorkersService } from '../../workers/workers.service';
import { CreateAttendanceDto } from "../dto/create-attendance.dto";
export declare class CreateAttendanceDataPipe {
    private readonly workersService;
    constructor(workersService: WorkersService);
    transform(data: CreateAttendanceDto & {
        price: number[];
    }, metadata: ArgumentMetadata): Promise<CreateAttendanceDto & {
        price: number[];
    }>;
}
