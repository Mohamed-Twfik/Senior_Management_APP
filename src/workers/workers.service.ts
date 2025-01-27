import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { WorkerDto } from './dto/worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';

@Injectable()
export class WorkersService extends BaseService {
  constructor(
    @InjectModel(Worker.name) private workersModel: Model<Worker>,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The worker model.
   */
  getModuleModel() {
    return this.workersModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      departments: await this.departmentsService.find(),
      type: 'workers',
      title: 'العمال'
    }
  }

  /**
   * Create a new worker.
   * @param createWorkerDto The data for the new worker.
   * @param user The user who is creating the new worker.
   */
  async create(createWorkerDto: WorkerDto, user: UserDocument) {
    const existWorker = await this.findOne({ name: createWorkerDto.name });
    if (existWorker) throw new ConflictException('إسم العامل موجود بالفعل');

    const inputDate: Worker = {
      ...createWorkerDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.workersModel.create(inputDate);
  }

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('department', 'name');
  }

  /**
   * Find all workers.
   * @param queryParams The query parameters.
   * @param user The user who is finding the workers.
   * @returns The workers.
   */
  // async findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType> {
  //   const queryBuilder = this.getQueryBuilder(queryParams);
  //   const data = await queryBuilder
  //     .filter()
  //     .sort()
  //     .paginate()
  //     .build()
  //     .populate('department', 'name')
  //     .populate('createdBy', 'username')
  //     .populate('updatedBy', 'username');

  //   const baseRenderVariables: BaseRenderVariablesType = {
  //     error: queryParams.error || null,
  //     data,
  //     user,
  //     filters: {
  //       search: queryBuilder.getSearchKey(),
  //       sort: queryBuilder.getSortKey(),
  //       pagination: {
  //         page: queryBuilder.getPage(),
  //         totalPages: await queryBuilder.getTotalPages(),
  //         pageSize: queryBuilder.getPageSize()
  //       },
  //       ...queryBuilder.getCustomFilters()
  //     }
  //   };
  //   const renderVariables = { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
  //   return renderVariables;
  // }

  /**
   * Update worker.
   * @param worker The worker who is wanted to be updated.
   * @param updateWorkerDto The data to update the worker.
   * @param user The user who is updating the worker.
   * @throws ConflictException if the name is already exist.
   */
  async update(worker: WorkerDocument, updateWorkerDto: WorkerDto, user: UserDocument) {
    const existWorker = await this.findOne({
      $and: [
        { name: updateWorkerDto.name },
        { _id: { $ne: worker._id } }
      ]
    });
    if (existWorker) throw new ConflictException('إسم العامل موجود بالفعل');

    const inputData: Partial<Worker> = {
      ...updateWorkerDto,
      updatedBy: user._id
    }

    await worker.set(inputData).save();
  }
}