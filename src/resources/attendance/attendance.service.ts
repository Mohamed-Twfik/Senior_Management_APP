import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { WorkerType } from 'src/resources/workers/enums/workerType.enum';
import { WorkersService } from 'src/resources/workers/workers.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance, AttendanceDocument } from './entities/attendance.entity';

@Injectable()
export class AttendanceService extends BaseService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    private readonly usersService: UsersService,
    private readonly workersService: WorkersService,
  ) {
    super();
  }

  getModuleModel(): Model<any> {
    return this.attendanceModel;
  }

  async getAdditionalRenderVariables(): Promise<object> {
    return {
      users: await this.usersService.find(),
      workers: await this.workersService.find(),
      type: 'attendance',
      title: 'الحضور'
    };
  }

  /**
   * Create attendance.
   * @param createDto Attendance data.
   * @param userDocument The user who is create attendance.
   */
  async create(createDto: CreateAttendanceDto & { price: number[] }, userDocument: UserDocument): Promise<void> {
    const inputData: Attendance[] = [];
    for (let i = 0; i < createDto.worker.length; i++) {
      const existAttendance = await this.attendanceModel.findOne({ worker: createDto.worker[i], date: createDto.date });
      if (existAttendance) continue;
      inputData.push({
        date: createDto.date,
        worker: createDto.worker[i],
        price: createDto.price[i],
        createdBy: userDocument._id,
        updatedBy: userDocument._id
      });
    };
    await this.attendanceModel.create(inputData);
  }

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('worker', 'name');
  }

  /**
   * Update attendance.
   * @param entity Attendance document that will be updated.
   * @param updateDto Attendance update data.
   * @param userDocument The user who is update attendance.
   */
  async update(entity: AttendanceDocument, updateDto: UpdateAttendanceDto, userDocument: UserDocument): Promise<void> {
    const existAttendance = await this.attendanceModel.findOne({ worker: updateDto.worker, date: updateDto.date, _id: { $ne: entity._id } });
    if (existAttendance) throw new ConflictException('تم إضافة حضور العامل مسبقا.');

    const inputData: Partial<Attendance> = {
      ...updateDto,
      updatedBy: userDocument._id
    };
    await entity.set(inputData).save();
  }

  async getSalaryData(startDate: Date, endDate: Date) {
    const workers = await this.attendanceModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: 'workers',
          localField: 'worker',
          foreignField: '_id',
          as: 'workerDetails',
        },
      },
      {
        $unwind: '$workerDetails',
      },
      {
        $match: {
          'workerDetails.type': { $ne: WorkerType.Production },
        },
      },
      {
        $group: {
          _id: '$worker',
          totalPrice: { $sum: { $ifNull: ['$price', 0] } },
          name: { $first: '$workerDetails.name' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalPrice: 1,
        },
      },
    ]);
    return workers;
  }
}
