import { UserDocument } from 'src/users/entities/user.entity';
import { ProductionDto } from './dto/production.dto';
import { ProductionDocument } from './entities/production.entity';
import { ProductionService } from './production.service';
export declare class ProductionController {
    private readonly productionService;
    constructor(productionService: ProductionService);
    create(createProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<{
        users: any[];
        workers: any[];
        products: any[];
        departments: any[];
        type: string;
        title: string;
        error: string | null;
        data: Array<any> | null;
        user: UserDocument;
        filters: {
            [key: string]: any;
            search: string;
            sort: string;
            pagination: {
                page: number;
                pageSize: number;
                totalPages: number;
            };
        };
    }>;
    update(production: ProductionDocument, updateProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    remove(production: ProductionDocument): Promise<void>;
}
