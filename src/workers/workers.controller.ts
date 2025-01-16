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
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { WorkerDocument } from './entities/worker.entity';
import { WorkerIdPipe } from './pipes/worker-id.pipe';
import { WorkersService } from './workers.service';
import { WorkerDataPipe } from './pipes/worker-data.pipe';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @Redirect('/workers')
  create(
    @GetUser() user: UserDocument,
    @Body(WorkerDataPipe) createWorkerDto: CreateWorkerDto
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
  @Redirect('/workers?sort=-updatedAt')
  update(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
    @GetUser() user: UserDocument,
    @Body(WorkerDataPipe) updateWorkerDto: UpdateWorkerDto,

  ) {
    return this.workersService.update(worker, updateWorkerDto, user);
  }

  @Get('delete/:workerId')
  @Redirect('/workers')
  remove(
    @Param('workerId', ObjectIdPipe, WorkerIdPipe) worker: WorkerDocument,
  ) {
    return this.workersService.remove(worker);
  }
}
