import { ArgumentMetadata, ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { CreateProductionDto } from "../dto/create-production.dto";
import { ProductionService } from "../production.service";
import { WorkersService } from '../../workers/workers.service';
import { Types } from "mongoose";

/**
 * Create production pipe.
 */
@Injectable()
export class ProductionDataPipe {
  constructor(
    private readonly productionService: ProductionService,
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
  transform(data: CreateProductionDto, metadata: ArgumentMetadata) {
    if (data.product) {
      const productExists = this.productsService.findById(data.product.toString());
      if (!productExists) throw new NotAcceptableException('خطأ في معرف المنتج.');
      data.product = new Types.ObjectId(data.product);
    }
    
    if (data.department) {
      const departmentExists = this.departmentsService.findById(data.department.toString());
      if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');
      data.department = new Types.ObjectId(data.department);
    }
    
    if (data.worker) {
      const workerExists = this.workersService.findById(data.worker.toString());
      if (!workerExists) throw new NotAcceptableException('خطأ في معرف العامل.');
      data.worker = new Types.ObjectId(data.worker);
    }

    return data;
  }
}