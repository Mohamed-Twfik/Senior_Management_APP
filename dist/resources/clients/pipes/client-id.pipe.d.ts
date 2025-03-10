import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ClientsService } from '../clients.service';
export declare class ClientIdPipe implements PipeTransform {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    transform(clientId: string, metadata: ArgumentMetadata): Promise<any>;
}
