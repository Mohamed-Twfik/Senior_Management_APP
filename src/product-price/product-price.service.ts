import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { QueryDto } from 'src/utils/dtos/query.dto';
import { DepartmentsService } from '../departments/departments.service';
import { ProductsService } from '../products/products.service';
import { ProductPriceDto } from './dto/product-price.dto';
import { ProductPrice, ProductPriceDocument } from './entities/product-price.entity';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';

@Injectable()
export class ProductPriceService extends BaseService {
  searchableKeys: string[] = [];
  
  constructor(
    @InjectModel(ProductPrice.name) private readonly productPriceModel: Model<ProductPrice>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService
  ) {
    super();
  }

  /**
   * Get the productPrice model.
   * @returns The productPrice model.
   */
  getModuleModel() {
    return this.productPriceModel;
  }

  /**
   * Get additional render variables.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      products: await this.productsService.find(),
      departments: await this.departmentsService.find(),
      type: 'productPrice',
      title: 'أسعار المنتجات'
    };
  }

  /**
   * Create a new productPrice.
   * 
   * @param createProductPriceDto the data for the new productPrice
   * @param user the user who is creating the new productPrice
   */
  async create(createProductPriceDto: ProductPriceDto, user: UserDocument) {
    const existPrice = await this.productPriceModel.findOne({ department: createProductPriceDto.department, product: createProductPriceDto.product });
    if (existPrice) throw new ConflictException('سعر المنتج في هذا القسم موجود بالفعل');
    
    const inputData: ProductPrice = {
      ...createProductPriceDto,
      createdBy: user._id,
      updatedBy: user._id,
    };
    await this.productPriceModel.create(inputData);
  }

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('product', 'name').populate('department', 'name');
  }

  /**
   * Update productPrice.
   * @param productPrice The productPrice who is wanted to be updated.
   * @param updateProductPriceDto The data to update the productPrice.
   * @param user The user who is updating the productPrice.
   * @throws ConflictException if the product price is already exist.
   */
  async update(productPrice: ProductPriceDocument, updateProductPriceDto: ProductPriceDto, user: UserDocument) {
    const existPrice = await this.productPriceModel.findOne({
      $and: [
        { department: updateProductPriceDto.department },
        { product: updateProductPriceDto.product },
        { _id: { $ne: productPrice._id } }
      ]
    });
    if (existPrice) throw new ConflictException('سعر المنتج في هذا القسم موجود بالفعل');

    const inputData: Partial<ProductPrice> = {
      ...updateProductPriceDto,
      updatedBy: user._id
    }

    await productPrice.set(inputData).save();
  }
}
