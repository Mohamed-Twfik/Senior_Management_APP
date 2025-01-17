import { UserDocument } from 'src/users/entities/user.entity';
import { ProductDto } from './dto/product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(user: UserDocument, createProductDto: ProductDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(product: ProductDocument, updateProductDto: ProductDto, user: UserDocument): Promise<void>;
    remove(product: ProductDocument): Promise<void>;
}
