import { ArgumentMetadata, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { DepartmentsService } from "src/departments/departments.service";
import { WorkerType } from "src/workers/enums/workerType.enum";
import { ProductPriceService } from '../../product-price/product-price.service';
import { ProductsService } from '../../products/products.service';
import { WorkersService } from '../../workers/workers.service';
import { ProductionDto } from "../dto/production.dto";

/**
 * Create production pipe.
 */
@Injectable()
export class ProductionDataPipe {
  constructor(
    private readonly productPriceService: ProductPriceService,
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
  ) { }
  /**
   * Transform production data to save it in the database.
   * 
   * @param data production  data
   * @param metadata metadata
   * @returns transformed production  data
   */
  async transform(data: any, metadata: ArgumentMetadata) {
    const workerExists = await this.workersService.findById(data.worker.toString());
    if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
    data.worker = workerExists._id;

    for (const productDetail of data.productionDetails) {
      const productExists = await this.productsService.findById(productDetail.product.toString());
      if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');
      productDetail.product = productExists._id;

      if (productDetail.department) {
        const departmentExists = await this.departmentsService.findById(productDetail.department.toString());
        if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');
        productDetail.department = departmentExists._id;
      } else {
        productDetail.department = workerExists.department;
      }

      if (workerExists.type !== WorkerType.Weekly) {
        const productPrice = await this.productPriceService.findOne({ product: productDetail.product, department: productDetail.department });
        if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
        productDetail.price = (productPrice.price / 100) * productDetail.quantity;
      }
    }
    return data;
  }
}