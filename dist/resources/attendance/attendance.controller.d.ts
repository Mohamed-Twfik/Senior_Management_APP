import { UserDocument } from 'src/resources/users/entities/user.entity';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceDocument } from './entities/attendance.entity';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto & {
        price: number[];
    }, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(attendance: AttendanceDocument, updateDto: UpdateAttendanceDto, user: UserDocument): Promise<void>;
    remove(attendance: AttendanceDocument): Promise<void>;
}
