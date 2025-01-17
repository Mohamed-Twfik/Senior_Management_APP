import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { ProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './entities/product.entity';
export declare class ProductsService extends BaseService {
    private productsModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(productsModel: Model<Product>, usersService: UsersService);
    getModuleModel(): Model<Product, {}, {}, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        type: string;
        title: string;
    }>;
    create(createProductDto: ProductDto, user: UserDocument): Promise<void>;
    update(product: ProductDocument, updateProductDto: ProductDto, user: UserDocument): Promise<void>;
}
