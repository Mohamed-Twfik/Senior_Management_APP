import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { BaseService } from 'src/utils/classes/base.service';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';
import { UsersService } from 'src/users/users.service';
import { WorkersService } from 'src/workers/workers.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
export declare class AttendanceService extends BaseService {
    private attendanceModel;
    private readonly usersService;
    private readonly workersService;
    searchableKeys: string[];
    constructor(attendanceModel: Model<Attendance>, usersService: UsersService, workersService: WorkersService);
    getModuleModel(): Model<any>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: CreateAttendanceDto, userDocument: UserDocument): Promise<void>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<{
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
    update(entity: AttendanceDocument, updateDto: any, userDocument: UserDocument): Promise<void>;
    getSalaryData(startDate: Date, endDate: Date): import("mongoose").Aggregate<any[]>;
}
