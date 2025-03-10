import { UserDocument } from 'src/resources/users/entities/user.entity';
import { ProductPriceDto } from './dto/product-price.dto';
import { ProductPriceDocument } from './entities/product-price.entity';
import { ProductPriceService } from './product-price.service';
export declare class ProductPriceController {
    private readonly productPriceService;
    constructor(productPriceService: ProductPriceService);
    create(createProductPriceDto: ProductPriceDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(productPrice: ProductPriceDocument, updateProductPriceDto: ProductPriceDto, user: UserDocument): Promise<void>;
    remove(productPrice: ProductPriceDocument): Promise<void>;
}
