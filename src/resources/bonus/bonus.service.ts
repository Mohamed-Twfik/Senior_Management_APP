import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepartmentsService } from 'src/resources/departments/departments.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { BonusDto } from './dto/bonus.dto';
import { Bonus, BonusDocument } from './entities/bonus.entity';


@Injectable()
export class BonusService extends BaseService {
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
  async create(createBonusDto: BonusDto, user: UserDocument) {
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

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('department', 'name');
  }

  /**
   * Update Bonus.
   * @param Bonus The Bonus who is wanted to be updated.
   * @param updateBonusDto The data to update the Bonus.
   * @param user The user who is updating the Bonus.
   * @throws ConflictException if the name is already exist.
   */
  async update(bonus: BonusDocument, updateBonusDto: BonusDto, user: UserDocument) {
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
