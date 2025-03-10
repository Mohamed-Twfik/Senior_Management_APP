import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductPriceService } from '../../product-price/product-price.service';
import { ProductsService } from '../../products/products.service';
import { WorkersService } from '../../workers/workers.service';
export declare class ProductionDataPipe {
    private readonly productPriceService;
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    constructor(productPriceService: ProductPriceService, productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService);
    transform(data: any, metadata: ArgumentMetadata): Promise<any>;
}
