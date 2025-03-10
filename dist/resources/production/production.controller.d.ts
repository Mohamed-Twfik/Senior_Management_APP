import { UserDocument } from 'src/resources/users/entities/user.entity';
import { ProductionDto } from './dto/production.dto';
import { ProductionDocument } from './entities/production.entity';
import { ProductionService } from './production.service';
export declare class ProductionController {
    private readonly productionService;
    constructor(productionService: ProductionService);
    create(createProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(production: ProductionDocument, updateProductionDto: ProductionDto, user: UserDocument): Promise<void>;
    remove(production: ProductionDocument): Promise<void>;
}
