import { Model, Document } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseService } from 'src/utils/classes/base.service';
import { PriceType } from './entities/price-type.entity';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
import { UsersService } from 'src/users/users.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { PriceTypeDto } from './dto/price-type.dto';
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
