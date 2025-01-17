import { ArgumentMetadata, ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { ProductPriceDto } from "../dto/product-price.dto";
import { ProductPriceService } from "../product-price.service";

/**
 * Create product price pipe.
 */
@Injectable()
export class CreateProductPricePipe {
  constructor(
    private readonly productsService: ProductsService,
    private readonly departmentsService: DepartmentsService,
    private readonly productPriceService: ProductPriceService,
  ) { }
  /**
   * Transform product price data to save it in the database.
   * 
   * @param data product price data
   * @param metadata metadata
   * @returns transformed product price data
   */
  async transform(data: ProductPriceDto, metadata: ArgumentMetadata) {
    const productExists = await this.productsService.findById(data.product.toString());
    if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');
    data.product = productExists._id;

    const departmentExists = await this.departmentsService.findById(data.department.toString());
    if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');
    data.department = departmentExists._id;

    return data;
  }
}