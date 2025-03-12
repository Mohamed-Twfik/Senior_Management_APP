import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Redirect,
    Render,
} from '@nestjs/common';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from './dto/department.dto';
import { DepartmentDocument } from './entities/department.entity';
import { DepartmentIdPipe } from './pipes/department-id.pipe';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Redirect('/departments')
  create(
    @GetUser() user: UserDocument,
    @Body() createDepartmentDto: DepartmentDto
  ) {
    return this.departmentsService.create(createDepartmentDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.departmentsService.findAll(queryParams, user);
  }

  @Post('update/:departmentId')
  @Redirect()
  update(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
    @Query(QueryParamPipe) queryParams: any,
    @Body() updateDepartmentDto: DepartmentDto,
    @GetUser() user: UserDocument,
  ) {
    return this.departmentsService.updateRoute(department, updateDepartmentDto, user, queryParams);
  }

  @Get('delete/:departmentId')
  @Redirect()
  remove(
    @Param('departmentId', ObjectIdPipe, DepartmentIdPipe) department: DepartmentDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.departmentsService.remove(department, queryParams);
  }
}
