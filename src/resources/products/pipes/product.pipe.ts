import { ArgumentMetadata, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductDto } from "../dto/product.dto";
import { ProductsService } from '../products.service';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { PriceTypeService } from '../../price-type/price-type.service';

/**
 * Create product pipe.
 */
@Injectable()
export class ProductPipe {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly priceTypeService: PriceTypeService
  ) { }
  /**
   * Transform product data to save it in the database.
   * 
   * @param data product data
   * @param metadata metadata
   * @returns transformed product data
   */
  async transform(data: ProductDto, metadata: ArgumentMetadata) {
    const categoryExists = await this.productCategoryService.findById(data.category.toString());
    if (!categoryExists) throw new NotAcceptableException('خطأ في معرف تصنيف المنتج.');
    data.category = categoryExists._id;

    const priceTypeExists = await this.priceTypeService.findById(data.priceType.toString());
    if (!priceTypeExists) throw new NotAcceptableException('خطأ في معرف فئة السعر.');
    data.priceType = priceTypeExists._id;

    return data;
  }
}