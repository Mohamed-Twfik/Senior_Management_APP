import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { ProductCategory, ProductCategoryDocument } from './entities/product-category.entity';
import { UsersService } from 'src/users/users.service';
import { ProductCategoryDto } from './dto/product-category.dto';
export declare class ProductCategoryService extends BaseService {
    private productCategoryModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(productCategoryModel: Model<ProductCategory>, usersService: UsersService);
    getModuleModel(): Model<any>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: ProductCategoryDto, user: UserDocument): Promise<void>;
    update(entity: ProductCategoryDocument, updateDto: ProductCategoryDto, user: UserDocument): Promise<void>;
}
