import { Model } from 'mongoose';
import { BaseService } from 'src/utils/classes/base.service';
import { UserDocument } from '../users/entities/user.entity';
import { Client, ClientDocument } from './entities/client.entity';
import { ClientsDto } from './dto/client.dto';
import { UsersService } from '../users/users.service';
export declare class ClientsService extends BaseService {
    private clientModel;
    private readonly usersService;
    searchableKeys: string[];
    constructor(clientModel: Model<Client>, usersService: UsersService);
    getModuleModel(): Model<any>;
    getAdditionalRenderVariables(): Promise<object>;
    create(createDto: ClientsDto, user: UserDocument): Promise<void>;
    update(entity: ClientDocument, updateDto: ClientsDto, user: UserDocument): Promise<void>;
}
