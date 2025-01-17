import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { ProductsService } from 'src/products/products.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { WorkerType } from 'src/workers/enums/workerType.enum';
import { WorkersService } from 'src/workers/workers.service';
import { ProductionDto } from './dto/production.dto';
import { Production, ProductionDocument } from './entities/production.entity';

@Injectable()
export class ProductionService extends BaseService {
  searchableKeys: string[] = [
    "arabicDate",
    "createdAtArabic",
    "updatedAtArabic",
  ];

  constructor(
    @InjectModel(Production.name) private productionModel: Model<Production>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The production model.
   */
  getModuleModel() {
    return this.productionModel;
  }

  /**
   * Get additional render variables.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      workers: await this.workersService.find(),
      products: await this.productsService.find(),
      departments: await this.departmentsService.find(),
      type: 'production',
      title: 'الإنتاج'
    };
  }

  /**
   * Create a new Production.
   * @param createProductionDto The data for the new Production.
   * @param user The user who is creating the new Production.
   * @throws NotFoundException if the product price not found.
   */
  async create(createProductionDto: ProductionDto, user: UserDocument) {
    const existProduction = await this.productionModel.findOne({
      worker: createProductionDto.worker,
      date: createProductionDto.date,
      product: createProductionDto.product,
      department: createProductionDto.department
    });
    if(existProduction) throw new ConflictException('تم إضافة الإنتاج مسبقا.');
    
    const inputDate: Production = {
      ...createProductionDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productionModel.create(inputDate);
  }

  /**
   * Find all production.
   * @param queryParams The query parameters.
   * @param user The user who is get production.
   * @returns The render variables.
   */
  async findAll(queryParams: QueryDto, user: UserDocument) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const production = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('worker', 'name')
      .populate('product', 'name')
      .populate('department', 'name')
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const renderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data: production,
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
    return {...renderVariables, ...(await this.getAdditionalRenderVariables())};
  }

  /**
   * Update Production.
   * @param Production The Production who is wanted to be updated.
   * @param updateProductionDto The data to update the Production.
   * @param user The user who is updating the Production.
   * @Throws NotFoundException if the product price not found.
   */
  async update(production: ProductionDocument, updateProductionDto: ProductionDto, user: UserDocument) {
    const existProduction = await this.productionModel.findOne({
      worker: updateProductionDto.worker,
      date: updateProductionDto.date,
      product: updateProductionDto.product,
      department: updateProductionDto.department,
      _id: { $ne: production._id }
    });
    if (existProduction) throw new ConflictException('تم إضافة الإنتاج مسبقا.');
    
    const inputData: Partial<Production> = {
      ...updateProductionDto,
      updatedBy: user._id
    }

    await production.set(inputData).save();
  }

  getSalaryData(startDate: Date, endDate: Date) {
    return this.productionModel.aggregate([
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
          localField: '_id',
          foreignField: '_id',
          as: 'workerDetails',
        },
      },
      {
        $unwind: '$workerDetails',
      },
      {
        $match: {
          'workerDetails.type': { $ne: WorkerType.Weekly },
        },
      },
      {
        $group: {
          _id: '$worker',
          totalPrice: { $sum: { $ifNull: ['$price', 0] } },
          name: { $first: '$workerDetails.name' },
          department: { $first: '$workerDetails.department' },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          department: 1,
          totalPrice: 1,
        },
      },
    ]);
  }
}
