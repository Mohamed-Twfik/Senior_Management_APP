import { Model, Query } from 'mongoose';
import { DepartmentsService } from 'src/departments/departments.service';
import { ProductsService } from 'src/products/products.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BaseService } from 'src/utils/classes/base.service';
import { WorkersService } from 'src/workers/workers.service';
import { ProductionDto } from './dto/production.dto';
import { Production, ProductionDocument } from './entities/production.entity';
import { FindQueryBuilderService } from 'src/utils/classes/find-query-builder.service';
export declare class ProductionService extends BaseService {
    private productionModel;
    private readonly usersService;
    private readonly productsService;
    private readonly workersService;
    private readonly departmentsService;
    constructor(productionModel: Model<Production>, usersService: UsersService, productsService: ProductsService, workersService: WorkersService, departmentsService: DepartmentsService);
    getModuleModel(): Model<Production, {}, {}, {}, import("mongoose").Document<unknown, {}, Production> & Production & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>;
    getAdditionalRenderVariables(): Promise<{
        users: any[];
        workers: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
    }>;
    create(createProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    applyFilters(queryBuilder: FindQueryBuilderService): Query<any, any, {}, unknown, "find", Record<string, never>>;
    update(production: ProductionDocument, updateProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    getSalaryData(startDate: Date, endDate: Date): Promise<any[]>;
}
