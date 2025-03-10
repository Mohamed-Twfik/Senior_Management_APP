import { ClientsService } from './clients.service';
import { UserDocument } from '../users/entities/user.entity';
import { ClientsDto } from './dto/client.dto';
import { ClientDocument } from './entities/client.entity';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(user: UserDocument, clientDto: ClientsDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(client: ClientDocument, clientDto: ClientsDto, user: UserDocument): Promise<void>;
    remove(client: ClientDocument): Promise<void>;
}
