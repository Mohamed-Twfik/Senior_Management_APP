import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { ProductCategoryService } from '../product-category.service';

/**
 * Validates productCategoryId if exist.
 */
@Injectable()
export class ProductCategoryIdPipe implements PipeTransform {
  constructor(private readonly productCategoryService: ProductCategoryService) { }
  
  /**
   * ProductCategoryId validation by get product from products collection.
   * 
   * @param productCategoryId product id
   * @param metadata metadata
   * @returns product category document if the product is found
   */
  async transform(productCategoryId: string, metadata: ArgumentMetadata) {
    const productCategory = await this.productCategoryService.findById(productCategoryId);
    if (!productCategory) throw new NotFoundException('خطأ في معرف المنتج.');
    return productCategory;
  }
}