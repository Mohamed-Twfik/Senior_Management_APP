import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ProductCategoryService } from '../product-category.service';
export declare class ProductCategoryIdPipe implements PipeTransform {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    transform(productCategoryId: string, metadata: ArgumentMetadata): Promise<any>;
}
