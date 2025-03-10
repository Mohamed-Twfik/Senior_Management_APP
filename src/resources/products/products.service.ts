import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { PriceTypeService } from '../price-type/price-type.service';

@Injectable()
export class ProductsService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Product.name) private productsModel: Model<Product>,
    private readonly usersService: UsersService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly priceTypeService: PriceTypeService
  ) {
    super();
  }

  /**
   * Get the module model.
   * @returns The product model.
   */
  getModuleModel() {
    return this.productsModel;
  }

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return super.applyFilters(queryBuilder).populate('category', 'name').populate('priceType', 'name');
  }

  /**
   * Get additional render variables for the dashboard.
   * @returns The additional render variables.
   */
  async getAdditionalRenderVariables() {
    return {
      users: await this.usersService.find(),
      categories: await this.productCategoryService.find(),
      priceTypes: await this.priceTypeService.find(),
      type: 'products',
      title: 'المنتجات'
    }
  }

  /**
   * Create a new Products.
   * @param createProductsDto The data for the new Product.
   * @param user The user who is creating the new Product.
   */
  async create(createProductDto: ProductDto, user: UserDocument) {
    const existProducts = await this.findOne({ name: createProductDto.name });
    if (existProducts) throw new ConflictException('إسم المنتج موجود بالفعل');

    const inputDate: Product = {
      ...createProductDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.productsModel.create(inputDate);
  }

  /**
   * Update product.
   * @param product The product who is wanted to be updated.
   * @param updateProductDto The data to update the product.
   * @param user The user who is updating the product.
   * @throws ConflictException if the name is already exist.
   */
  async update(product: ProductDocument, updateProductDto: ProductDto, user: UserDocument) {
    const existProduct = await this.findOne({
      $and: [
        { name: updateProductDto.name },
        { _id: { $ne: product._id } }
      ]
    });
    if (existProduct) throw new ConflictException('إسم المنتج موجود بالفعل');
    
    const inputData: Partial<Product> = {
      ...updateProductDto,
      updatedBy: user._id
    }

    await product.set(inputData).save();
  }
}
