import { ArgumentMetadata } from "@nestjs/common";
import { ProductDto } from "../dto/product.dto";
import { ProductsService } from '../products.service';
import { ProductCategoryService } from '../../product-category/product-category.service';
import { PriceTypeService } from '../../price-type/price-type.service';
export declare class ProductPipe {
    private readonly productsService;
    private readonly productCategoryService;
    private readonly priceTypeService;
    constructor(productsService: ProductsService, productCategoryService: ProductCategoryService, priceTypeService: PriceTypeService);
    transform(data: ProductDto, metadata: ArgumentMetadata): Promise<ProductDto>;
}
