import { Document, Model } from 'mongoose';
import { DepartmentsService } from 'src/resources/departments/departments.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { PriceTypeDto } from './dto/price-type.dto';
import { PriceType } from './entities/price-type.entity';
export declare class PriceTypeService extends BaseService {
    private readonly priceTypeModel;
    private readonly usersService;
    private readonly departmentsService;
    constructor(priceTypeModel: Model<PriceType>, usersService: UsersService, departmentsService: DepartmentsService);
    getModuleModel(): Model<any>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: PriceTypeDto, user: UserDocument): Promise<void>;
    update(entity: Document, updateDto: PriceTypeDto, user: UserDocument): Promise<void>;
}
