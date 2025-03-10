import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { ProductDto } from "../dto/product.dto";
import { ProductsService } from '../products.service';
export declare class ProductPipe {
    private readonly productsService;
    private readonly departmentsService;
    constructor(productsService: ProductsService, departmentsService: DepartmentsService);
    transform(data: ProductDto, metadata: ArgumentMetadata): Promise<ProductDto>;
}
