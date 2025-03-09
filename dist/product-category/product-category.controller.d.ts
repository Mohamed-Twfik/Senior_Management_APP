import { ProductCategoryService } from './product-category.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { ProductCategoryDto } from './dto/product-category.dto';
import { ProductCategoryDocument } from './entities/product-category.entity';
export declare class ProductCategoryController {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    create(user: UserDocument, productCategoryDto: ProductCategoryDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(productCategory: ProductCategoryDocument, productCategoryDto: ProductCategoryDto, user: UserDocument): Promise<void>;
    remove(productCategory: ProductCategoryDocument): Promise<void>;
}
