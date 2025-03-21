import { UserDocument } from 'src/resources/users/entities/user.entity';
import { ProductCategoryDto } from './dto/product-category.dto';
import { ProductCategoryDocument } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';
export declare class ProductCategoryController {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    create(user: UserDocument, productCategoryDto: ProductCategoryDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(productCategory: ProductCategoryDocument, queryParams: any, productCategoryDto: ProductCategoryDto, user: UserDocument): Promise<{
        url: string;
    }>;
    remove(productCategory: ProductCategoryDocument, queryParams: any): Promise<object>;
}
