import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { WorkersService } from 'src/workers/workers.service';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
export declare class AttendanceService extends BaseService {
    private attendanceModel;
    private readonly usersService;
    private readonly workersService;
    constructor(attendanceModel: Model<Attendance>, usersService: UsersService, workersService: WorkersService);
    getModuleModel(): Model<any>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: AttendanceDto, userDocument: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(entity: AttendanceDocument, updateDto: AttendanceDto, userDocument: UserDocument): Promise<void>;
    getSalaryData(startDate: Date, endDate: Date): Promise<any[]>;
}
