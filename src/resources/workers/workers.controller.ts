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
import { WorkerDto } from './dto/worker.dto';
import { WorkerDocument } from './entities/worker.entity';
import { WorkerDataPipe } from './pipes/worker-data.pipe';
import { WorkerIdPipe } from './pipes/worker-id.pipe';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @Redirect('/workers')
  create(
    @GetUser() user: UserDocument,
    @Body(WorkerDataPipe) createWorkerDto: WorkerDto
  ) {
    return this.workersService.create(createWorkerDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.workersService.findAll(queryParams, user);
  }

  @Post('update/:workerId')
  @Redirect()
  update(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
    @Body(WorkerDataPipe) updateWorkerDto: WorkerDto,

  ) {
    return this.workersService.updateRoute(worker, updateWorkerDto, user, queryParams);
  }

  @Get('delete/:workerId')
  @Redirect()
  remove(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.workersService.remove(worker, queryParams);
  }
}
