import { UserDocument } from 'src/users/entities/user.entity';
import { BonusService } from './bonus.service';
import { BonusDto } from './dto/bonus.dto';
import { BonusDocument } from './entities/bonus.entity';
export declare class BonusController {
    private readonly bonusService;
    constructor(bonusService: BonusService);
    create(createBonusDto: BonusDto, user: UserDocument): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(bonus: BonusDocument, updateBonusDto: BonusDto, user: UserDocument): Promise<void>;
    remove(bonus: BonusDocument): Promise<void>;
}
