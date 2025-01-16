import { Controller, Get, Post, Body, Param, Redirect, Query, Render } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceDataPipe } from './pipes/attendance-data.pipe';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { AttendanceIdPipe } from './pipes/attendance-id.pipe';
import { AttendanceDocument } from './entities/attendance.entity';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Redirect('/attendance')
  create(
    @Body(AttendanceDataPipe) createAttendanceDto: CreateAttendanceDto,
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
    @Body(AttendanceDataPipe) updateDto: UpdateAttendanceDto,
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
