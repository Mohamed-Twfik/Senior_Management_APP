import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { ProductsService } from '../../products/products.service';
import { ProductPriceDto } from "../dto/product-price.dto";
import { ProductPriceService } from "../product-price.service";
export declare class CreateProductPricePipe {
    private readonly productsService;
    private readonly departmentsService;
    private readonly productPriceService;
    constructor(productsService: ProductsService, departmentsService: DepartmentsService, productPriceService: ProductPriceService);
    transform(data: ProductPriceDto, metadata: ArgumentMetadata): Promise<ProductPriceDto>;
}
