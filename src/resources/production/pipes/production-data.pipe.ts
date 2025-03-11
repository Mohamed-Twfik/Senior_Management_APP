import { ArgumentMetadata, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { WorkerType } from "src/resources/workers/enums/workerType.enum";
import { ProductsService } from '../../products/products.service';
import { WorkersService } from '../../workers/workers.service';
import { PriceTypeService } from '../../price-type/price-type.service';

/**
 * Create production pipe.
 */
@Injectable()
export class ProductionDataPipe {
  constructor(
    private readonly productsService: ProductsService,
    private readonly workersService: WorkersService,
    private readonly departmentsService: DepartmentsService,
    private readonly priceTypeService: PriceTypeService
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

    // for (const productDetail of data.productionDetails) {
    for (let i = 0; i < data.productionDetails.length; i++) {
      const productDetail = data.productionDetails[i];
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
        const priceType = await this.priceTypeService.findById(productExists.priceType.toString());
        const unitPrice = priceType.departmentsPrice.find(price => price.department.toString() === productDetail.department.toString());
        productDetail.price = (unitPrice.price / 100) * productDetail.quantity;
      }
    }
    return data;
  }
}