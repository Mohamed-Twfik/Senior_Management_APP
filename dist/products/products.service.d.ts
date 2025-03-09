import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { ProductCategoryService } from '../product-category/product-category.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
export declare class ProductsService extends BaseService {
    private productsModel;
    private readonly usersService;
    private readonly productCategoryService;
    searchableKeys: string[];
    constructor(productsModel: Model<Product>, usersService: UsersService, productCategoryService: ProductCategoryService);
    getModuleModel(): Model<Product, {}, {}, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        categories: any[];
        type: string;
        title: string;
    }>;
    create(createProductDto: ProductDto, user: UserDocument): Promise<void>;
    update(product: ProductDocument, updateProductDto: ProductDto, user: UserDocument): Promise<void>;
}
