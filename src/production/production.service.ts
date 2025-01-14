import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { ProductsService } from 'src/products/products.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { WorkersService } from 'src/workers/workers.service';
import { ProductPriceService } from '../product-price/product-price.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production, ProductionDocument } from './entities/production.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { GetSalaryDto } from './dto/get-salary.dto';
import { BonusService } from 'src/bonus/bonus.service';

@Injectable()
export class ProductionService extends BaseService {
  searchableKeys: string[] = [
    "arabicDate"
  ];

  constructor(
    @InjectModel(Production.name) private productionModel: Model<Production>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
    private readonly productPriceService: ProductPriceService,
    private readonly bonusService: BonusService
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
  async create(createProductionDto: CreateProductionDto, user: UserDocument) {
    createProductionDto.worker = new Types.ObjectId(createProductionDto.worker);
    createProductionDto.product = new Types.ObjectId(createProductionDto.product);
    createProductionDto.department = new Types.ObjectId(createProductionDto.department);

    const productPrice = await this.productPriceService.findOne({ product: createProductionDto.product, department: createProductionDto.department });
    if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
    const cost = (productPrice.price / 100) * createProductionDto.quantity;
    
    const inputDate: Production = {
      ...createProductionDto,
      cost,
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
  async update(Production: ProductionDocument, updateProductionDto: UpdateProductionDto, user: UserDocument) {
    if (updateProductionDto.worker) updateProductionDto.worker = new Types.ObjectId(updateProductionDto.worker);
    else updateProductionDto.worker = Production.worker;

    if (updateProductionDto.product) updateProductionDto.product = new Types.ObjectId(updateProductionDto.product);
    else updateProductionDto.product = Production.product;

    if (updateProductionDto.department) updateProductionDto.department = new Types.ObjectId(updateProductionDto.department);
    else updateProductionDto.department = Production.department;
    
    const productPrice = await this.productPriceService.findOne({ product: updateProductionDto.product, department: updateProductionDto.department });
    if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
    const cost = (productPrice.price / 100) * updateProductionDto.quantity;
    
    const inputData: Partial<Production> = {
      ...updateProductionDto,
      cost,
      updatedBy: user._id
    }

    await Production.set(inputData).save();
  }

  async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string) {
    const salaries = await this.workersService.getSalary(getSalaryDto, user, error);
    console.log(salaries);
    for (const salary of salaries) {
      salary.bonus = 0;
      if(salary.workerType === 'production') {
        const bonusPresent = await this.bonusService.findOne({
          from: { $lte: salary.salary },
          to: { $gte: salary.salary },
          department: salary.department
        });
        const department = await this.departmentsService.findById(salary.department);
        if (bonusPresent) {
          let bonus = (bonusPresent.percentage / 100) * salary.pureSalary;
          salary.bonus = (bonus > department.bonusLimit) ? department.bonusLimit : bonus;
        } else {
          salary.bonus = 0;
        }
      }
      salary.totalSalary = salary.pureSalary + salary.bonus;
    };
    return { data: salaries, user, error: error || null };
  }
}
