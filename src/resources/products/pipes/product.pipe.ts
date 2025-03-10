import { ArgumentMetadata, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductDto } from "../dto/product.dto";
import { ProductsService } from '../products.service';

/**
 * Create product pipe.
 */
@Injectable()
export class ProductPipe {
  constructor(
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService,
  ) { }
  /**
   * Transform product data to save it in the database.
   * 
   * @param data product data
   * @param metadata metadata
   * @returns transformed product data
   */
  async transform(data: ProductDto, metadata: ArgumentMetadata) {
    const categoryExists = await this.productsService.findById(data.category.toString());
    if (!categoryExists) throw new NotAcceptableException('خطأ في معرف الفئة.');
    data.category = categoryExists._id;

    return data;
  }
}