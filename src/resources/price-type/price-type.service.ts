import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { DepartmentsService } from 'src/resources/departments/departments.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { PriceTypeDto } from './dto/price-type.dto';
import { PriceType } from './entities/price-type.entity';

@Injectable()
export class PriceTypeService extends BaseService {
  constructor(
    @InjectModel(PriceType.name) private readonly priceTypeModel: Model<PriceType>,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService
  ) {
    super();
  }

  getModuleModel(): Model<any> {
    return this.priceTypeModel;
  }

  
  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('departmentsPrice.department', 'name');
  }

  async getAdditionalRenderVariables(): Promise<object> {
    return {
      users: await this.usersService.find(),
      departments: await this.departmentsService.find(),
      type: 'priceType',
      title: 'انواع الاسعار'
    };
  }

  async create(createDto: PriceTypeDto, user: UserDocument): Promise<void> {
    const existPrice = await this.priceTypeModel.findOne({ name: createDto.name });
    if (existPrice) throw new ConflictException('نوع السعر موجود بالفعل');
    
    const inputData: PriceType = {
      ...createDto,
      createdBy: user._id,
      updatedBy: user._id,
    };
    await this.priceTypeModel.create(inputData);
  }

  async update(entity: Document, updateDto: PriceTypeDto, user: UserDocument): Promise<void> {
    const existPrice = await this.priceTypeModel.findOne({
      $and: [
        { name: updateDto.name },
        { _id: { $ne: entity._id } }
      ]
    });
    if (existPrice) throw new ConflictException('نوع السعر موجود بالفعل');

    const inputData: Partial<PriceType> = {
      ...updateDto,
      updatedBy: user._id
    }

    await entity.set(inputData).save();
  }
}
