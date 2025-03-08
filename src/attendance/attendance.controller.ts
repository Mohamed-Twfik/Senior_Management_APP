import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceDocument } from './entities/attendance.entity';
import { CreateAttendanceDataPipe } from './pipes/create-attendance-data.pipe';
import { AttendanceIdPipe } from './pipes/attendance-id.pipe';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { UpdateAttendanceDataPipe } from './pipes/update-attendance-data.pipe';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Redirect('/attendance')
  create(
    @Body(CreateAttendanceDataPipe) createAttendanceDto: CreateAttendanceDto & { price: number[] },
    @GetUser() user: UserDocument,
  ) {
    return this.attendanceService.create(createAttendanceDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.attendanceService.findAll(queryParams, user);
  }

  @Post('update/:attendanceId')
  @Redirect('/attendance?sort=-updatedAt')
  update(
    @Param('attendanceId', ObjectIdPipe, AttendanceIdPipe) attendance: AttendanceDocument,
    @Body(UpdateAttendanceDataPipe) updateDto: UpdateAttendanceDto,
    @GetUser() user: UserDocument,
  ) {
    return this.attendanceService.update(attendance, updateDto, user);
  }

  @Get('delete/:attendanceId')
  @Redirect('/attendance')
  remove(@Param('attendanceId', ObjectIdPipe, AttendanceIdPipe) attendance: AttendanceDocument,) {
    return this.attendanceService.remove(attendance);
  }
}
