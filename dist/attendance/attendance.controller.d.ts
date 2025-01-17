import { UserDocument } from 'src/users/entities/user.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceDocument } from './entities/attendance.entity';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: AttendanceDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<{
        error: string | null;
        data: Array<any> | null;
        user: UserDocument;
        filters: {
            [key: string]: any;
            search: string;
            sort: string;
            pagination: {
                page: number;
                pageSize: number;
                totalPages: number;
            };
        };
    }>;
    update(attendance: AttendanceDocument, updateDto: AttendanceDto, user: UserDocument): Promise<void>;
    remove(attendance: AttendanceDocument): Promise<void>;
}
