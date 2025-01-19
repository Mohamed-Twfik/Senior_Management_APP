import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { ProductPriceDto } from "../dto/product-price.dto";
export declare class ProductPricePipe {
    private readonly productsService;
    private readonly departmentsService;
    constructor(productsService: ProductsService, departmentsService: DepartmentsService);
    transform(data: ProductPriceDto, metadata: ArgumentMetadata): Promise<ProductPriceDto>;
}
