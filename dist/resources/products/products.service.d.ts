import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { PriceTypeService } from '../price-type/price-type.service';
export declare class ProductsService extends BaseService {
    private productsModel;
    private readonly usersService;
    private readonly productCategoryService;
    private readonly priceTypeService;
    searchableKeys: string[];
    constructor(productsModel: Model<Product>, usersService: UsersService, productCategoryService: ProductCategoryService, priceTypeService: PriceTypeService);
    getModuleModel(): Model<Product, {}, {}, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    enterData(): Promise<void>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        categories: any[];
        priceTypes: any[];
        type: string;
        title: string;
    }>;
    create(createProductDto: ProductDto, user: UserDocument): Promise<void>;
    update(product: ProductDocument, updateProductDto: ProductDto, user: UserDocument): Promise<void>;
}
