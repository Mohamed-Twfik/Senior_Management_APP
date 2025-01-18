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
  async transform(data: ProductionDto & {price: number}, metadata: ArgumentMetadata) {
    const productExists = await this.productsService.findById(data.product.toString());
    if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');
    data.product = productExists._id;
    
    const workerExists = await this.workersService.findById(data.worker.toString());
    if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
    data.worker = workerExists._id;

    if (data.department) {
      const departmentExists = await this.departmentsService.findById(data.department.toString());
      if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');
      data.department = departmentExists._id;
    } else {
      data.department = workerExists.department;
    }

    if (workerExists.type !== WorkerType.Weekly) {
      const productPrice = await this.productPriceService.findOne({ product: data.product, department: data.department });
      if (!productPrice) throw new NotFoundException('يجب تحديد سعر المنتج لهذا القسم');
      data.price = Math.ceil((productPrice.price / 100) * data.quantity);
    }

    return data;
  }
}