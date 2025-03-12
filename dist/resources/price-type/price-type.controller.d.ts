import { UserDocument } from 'src/resources/users/entities/user.entity';
import { PriceTypeDto } from './dto/price-type.dto';
import { PriceTypeDocument } from './entities/price-type.entity';
import { PriceTypeService } from './price-type.service';
export declare class PriceTypeController {
    private readonly priceTypeService;
    constructor(priceTypeService: PriceTypeService);
    create(createPriceTypeDto: PriceTypeDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(priceType: PriceTypeDocument, queryParams: any, updatePriceTypeDto: PriceTypeDto, user: UserDocument): Promise<{
        url: string;
    }>;
    remove(priceType: PriceTypeDocument, queryParams: any): Promise<object>;
}
