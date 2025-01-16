import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetSalaryDto } from 'src/production/dto/get-salary.dto';
import { Production } from 'src/production/entities/production.entity';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker, WorkerDocument } from './entities/worker.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DepartmentsService } from 'src/departments/departments.service';
import { WorkerType } from './enums/workerType.enum';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

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
  async create(createWorkerDto: CreateWorkerDto, user: UserDocument) {
    const { name } = createWorkerDto;
    const existWorker = await this.findOne({ name });
    if (existWorker) throw new ConflictException('إسم العامل موجود بالفعل');

    const inputDate: Worker = {
      ...createWorkerDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.workersModel.create(inputDate);
  }

  /**
   * Find all workers.
   * @param queryParams The query parameters.
   * @param user The user who is finding the workers.
   * @returns The workers.
   */
  async findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType> {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const data = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('department', 'name')
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const baseRenderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data,
      user,
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        },
        ...queryBuilder.getCustomFilters()
      }
    };
    const renderVariables = { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
    return renderVariables;
  }

  /**
   * Update worker.
   * @param worker The worker who is wanted to be updated.
   * @param updateWorkerDto The data to update the worker.
   * @param user The user who is updating the worker.
   * @throws ConflictException if the name is already exist.
   */
  async update(worker: WorkerDocument, updateWorkerDto: UpdateWorkerDto, user: UserDocument) {
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


  // async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string) {
  //   const salaries = await this.workersModel.aggregate([
  //     {
  //       $lookup: {
  //         from: Production.name, // Replace 'productions' with your actual Production collection name
  //         localField: "_id",
  //         foreignField: "worker",
  //         as: "productions"
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         salary: 1,
  //         department: 1,
  //         workerType: {
  //           $cond: { if: { $eq: ["$salary", 0] }, then: WorkerType.Production, else: WorkerType.Daily }
  //         },
  //         productions: {
  //           $filter: {
  //             input: "$productions",
  //             as: "production",
  //             cond: {
  //               $and: [
  //                 { $gte: ["$$production.date", getSalaryDto.from] },
  //                 { $lte: ["$$production.date", getSalaryDto.to] }
  //               ]
  //             }
  //           }
  //         }
  //       }
  //     },
  //     {
  //       $addFields: {
  //         totalProductionCost: {
  //           $cond: {
  //             if: { $eq: ["$workerType", WorkerType.Production] },
  //             then: { $sum: "$productions.cost" }, // Sum cost for production workers
  //             else: 0
  //           }
  //         },
  //         attendedDays: {
  //           $cond: {
  //             if: { $eq: ["$workerType", WorkerType.Daily] },
  //             then: {
  //               $size: {
  //                 $setUnion: {
  //                   $map: {
  //                     input: "$productions",
  //                     as: "production",
  //                     in: "$$production.date"
  //                   }
  //                 }
  //               }
  //             },
  //             else: 0
  //           }
  //         }
  //       }
  //     },
  //     {
  //       $addFields: {
  //         pureSalary: {
  //           $cond: {
  //             if: { $eq: ["$workerType", WorkerType.Production] },
  //             then: { $ifNull: ["$totalProductionCost", 0] }, // Default to 0 if null
  //             else: { 
  //               $multiply: [
  //                 { $ifNull: ["$salary", 0] }, 
  //                 { $ifNull: ["$attendedDays", 0] }
  //               ] 
  //             } // Default to 0 if null
  //           }
  //         }
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         department: 1,
  //         workerType: 1,
  //         pureSalary: 1
  //       }
  //     }
  //   ]);
  //   return salaries;
  // }
}