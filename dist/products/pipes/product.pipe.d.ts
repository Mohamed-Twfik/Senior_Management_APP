import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../products.service';
import { ProductDto } from "../dto/product.dto";
export declare class ProductPipe {
    private readonly productsService;
    private readonly departmentsService;
    constructor(productsService: ProductsService, departmentsService: DepartmentsService);
    transform(data: ProductDto, metadata: ArgumentMetadata): Promise<ProductDto>;
}
