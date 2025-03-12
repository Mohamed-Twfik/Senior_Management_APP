import { UserDocument } from 'src/resources/users/entities/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(user: UserDocument, createProductDto: ProductDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(product: ProductDocument, queryParams: any, updateProductDto: ProductDto, user: UserDocument): Promise<{
        url: string;
    }>;
    remove(product: ProductDocument, queryParams: any): Promise<object>;
}
