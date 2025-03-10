import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { WorkersService } from 'src/resources/workers/workers.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';
export declare class AttendanceService extends BaseService {
    private attendanceModel;
    private readonly usersService;
    private readonly workersService;
    constructor(attendanceModel: Model<Attendance>, usersService: UsersService, workersService: WorkersService);
    getModuleModel(): Model<any>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: CreateAttendanceDto & {
        price: number[];
    }, userDocument: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(entity: AttendanceDocument, updateDto: UpdateAttendanceDto, userDocument: UserDocument): Promise<void>;
    getSalaryData(startDate: Date, endDate: Date): Promise<any[]>;
}
