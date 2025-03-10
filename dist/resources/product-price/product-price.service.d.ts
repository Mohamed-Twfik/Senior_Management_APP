import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { DepartmentsService } from '../departments/departments.service';
import { ProductsService } from '../products/products.service';
import { ProductPriceDto } from './dto/product-price.dto';
import { ProductPrice, ProductPriceDocument } from './entities/product-price.entity';
export declare class ProductPriceService extends BaseService {
    private readonly productPriceModel;
    private readonly usersService;
    private readonly productsService;
    private readonly departmentsService;
    searchableKeys: string[];
    constructor(productPriceModel: Model<ProductPrice>, usersService: UsersService, productsService: ProductsService, departmentsService: DepartmentsService);
    getModuleModel(): Model<ProductPrice, {}, {}, {}, import("mongoose").Document<unknown, {}, ProductPrice> & ProductPrice & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
    }>;
    create(createProductPriceDto: ProductPriceDto, user: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(productPrice: ProductPriceDocument, updateProductPriceDto: ProductPriceDto, user: UserDocument): Promise<void>;
}
