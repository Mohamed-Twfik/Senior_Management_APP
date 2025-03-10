import { Model } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { ProductCategoryDto } from './dto/product-category.dto';
import { ProductCategory, ProductCategoryDocument } from './entities/product-category.entity';
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
