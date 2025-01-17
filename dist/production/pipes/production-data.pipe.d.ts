import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductPriceService } from '../../product-price/product-price.service';
import { ProductsService } from '../../products/products.service';
import { WorkersService } from '../../workers/workers.service';
import { ProductionDto } from "../dto/production.dto";
export declare class ProductionDataPipe {
    private readonly productPriceService;
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    constructor(productPriceService: ProductPriceService, productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService);
    transform(data: ProductionDto & {
        price: number;
    }, metadata: ArgumentMetadata): Promise<ProductionDto & {
        price: number;
    }>;
}
