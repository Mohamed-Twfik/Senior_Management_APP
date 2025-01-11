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

@Injectable()
export class WorkersService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Worker.name) private workersModel: Model<Worker>,
    private readonly usersService: UsersService
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
   * Update worker.
   * @param worker The worker who is wanted to be updated.
   * @param updateWorkerDto The data to update the worker.
   * @param user The user who is updating the worker.
   * @throws ConflictException if the name is already exist.
   */
  async update(worker: WorkerDocument, updateWorkerDto: CreateWorkerDto, user: UserDocument) {
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


  async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string) {
    const salaries = await this.workersModel.aggregate([
      {
        $lookup: {
          from: Production.name, // Replace 'productions' with your actual Production collection name
          localField: "_id",
          foreignField: "worker",
          as: "productions"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          salary: 1,
          workerType: {
            $cond: { if: { $eq: ["$salary", 0] }, then: "production", else: "daily" }
          },
          productions: {
            $filter: {
              input: "$productions",
              as: "production",
              cond: {
                $and: [
                  { $gte: ["$$production.date", getSalaryDto.from] },
                  { $lte: ["$$production.date", getSalaryDto.to] }
                ]
              }
            }
          }
        }
      },
      {
        $addFields: {
          totalProductionCost: {
            $cond: {
              if: { $eq: ["$workerType", "production"] },
              then: { $sum: "$productions.cost" }, // Sum cost for production workers
              else: 0
            }
          },
          attendedDays: {
            $cond: {
              if: { $eq: ["$workerType", "daily"] },
              then: {
                $size: {
                  $setUnion: {
                    $map: {
                      input: "$productions",
                      as: "production",
                      in: "$$production.date"
                    }
                  }
                }
              },
              else: 0
            }
          }
        }
      },
      {
        $addFields: {
          totalSalary: {
            $cond: {
              if: { $eq: ["$workerType", "production"] },
              then: "$totalProductionCost", // Total salary for production workers
              else: { $multiply: ["$salary", "$attendedDays"] } // Total salary for daily workers
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          workerType: 1,
          totalSalary: 1
        }
      }
    ]);
    return salaries;
  }
}