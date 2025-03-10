import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { WorkersService } from '../../workers/workers.service';
import { PriceTypeService } from '../../price-type/price-type.service';
export declare class ProductionDataPipe {
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    private readonly priceTypeService;
    constructor(productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService, priceTypeService: PriceTypeService);
    transform(data: any, metadata: ArgumentMetadata): Promise<any>;
}
