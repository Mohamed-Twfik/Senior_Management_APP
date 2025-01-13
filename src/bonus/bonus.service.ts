import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { QueryDto } from 'src/utils/dtos/query.dto';


@Injectable()
export class BonusService extends BaseService {
  searchableKeys: string[] = [];

  constructor(
    @InjectModel(Bonus.name) private bonusModel: Model<Bonus>,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService,
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The bonus model.
   */
  getModuleModel() {
    return this.bonusModel;
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      departments: await this.departmentsService.find(),
      type: 'bonus',
      title: 'الحوافز',
    }
  }

  /**
   * Create a new bonus.
   * @param createBonusDto The data for the new bonus.
   * @param user The user who is creating the new bonus.
   */
  async create(createBonusDto: CreateBonusDto, user: UserDocument) {
    createBonusDto.to = (createBonusDto.to === 0)? Infinity : createBonusDto.to;
    if (createBonusDto.from >= createBonusDto.to) throw new NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');
    
    createBonusDto.department = new Types.ObjectId(createBonusDto.department);
    
    const existBonus = await this.bonusModel.findOne({
      $and: [
            {
              $or: [
                { from: createBonusDto.from },
                { to: createBonusDto.to }
              ]
            },
            { department: createBonusDto.department }
          ]
    });
    if (existBonus) throw new ConflictException('أحد أطراف الحافز مكرر');

    const inputDate: Bonus = {
      ...createBonusDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.bonusModel.create(inputDate);
  }

    /**
   * Find all bonuses.
   * @param queryParams The query parameters.
   * @param user The user who is get bonuses.
   * @returns The render variables.
   */
  async findAll(queryParams: QueryDto, user: UserDocument) {
    const queryBuilder = this.getQueryBuilder(queryParams);
    const bonus = await queryBuilder
      .filter()
      .search(this.searchableKeys)
      .sort()
      .paginate()
      .build()
      .populate('department', 'name')
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    const renderVariables: BaseRenderVariablesType = {
      error: queryParams.error || null,
      data: bonus,
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
   * Update Bonus.
   * @param Bonus The Bonus who is wanted to be updated.
   * @param updateBonusDto The data to update the Bonus.
   * @param user The user who is updating the Bonus.
   * @throws ConflictException if the name is already exist.
   */
  async update(bonus: BonusDocument, updateBonusDto: UpdateBonusDto, user: UserDocument) {
    updateBonusDto.to = (updateBonusDto.to === 0)? Infinity : (updateBonusDto.to || bonus.to);
    if (updateBonusDto.from >= updateBonusDto.to) throw new NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');
    
    if (updateBonusDto.department) updateBonusDto.department = new Types.ObjectId(updateBonusDto.department);
    else updateBonusDto.department = bonus.department;
    
    const existBonus = await this.bonusModel.findOne({
      $and: [
        { _id: { $ne: bonus._id } },
        {
          $and: [
            {
              $or: [
                { from: updateBonusDto.from },
                { to: updateBonusDto.to }
              ]
            },
            { department: updateBonusDto.department || bonus.department }
          ]
        }
      ]
    });
    if (existBonus) throw new ConflictException('أحد أطراف الحافز مكرر');
    const inputData: Partial<Bonus> = {
      ...updateBonusDto,
      updatedBy: user._id
    }

    await bonus.set(inputData).save();
  }
}
