import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { ProductCategory, ProductCategoryDocument } from './entities/product-category.entity';
import { UsersService } from 'src/users/users.service';
import { ProductCategoryDto } from './dto/product-category.dto';

@Injectable()
export class ProductCategoryService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(ProductCategory.name) private productCategoryModel: Model<ProductCategory>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  getModuleModel(): Model<any> {
    return this.productCategoryModel;
  }

  async getAdditionalRenderVariables(): Promise<object> {
    return {
      users: await this.usersService.find(),
      type: 'productCategory',
      title: 'فئات المنتجات'
    }
  }

  async create(createDto: ProductCategoryDto, user: UserDocument): Promise<void> {
    const existProductCategory = await this.findOne({ name: createDto.name });
    if (existProductCategory) throw new ConflictException('إسم الفئة موجود بالفعل');

    const inputDate: ProductCategory = {
      ...createDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productCategoryModel.create(inputDate);
  }

  async update(entity: ProductCategoryDocument, updateDto: ProductCategoryDto, user: UserDocument): Promise<void> {
    const existProductCategory = await this.findOne({
      $and: [
        { name: updateDto.name },
        { _id: { $ne: entity._id } }
      ]
    });
    if (existProductCategory) throw new ConflictException('إسم المنتج موجود بالفعل');
    
    const inputData: Partial<ProductCategory> = {
      ...updateDto,
      updatedBy: user._id
    }

    await entity.set(inputData).save();
  }
}
