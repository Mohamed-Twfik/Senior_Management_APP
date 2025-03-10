import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { ClientsService } from '../clients.service';

/**
 * Validates clientId if exist.
 */
@Injectable()
export class ClientIdPipe implements PipeTransform {
  constructor(private readonly clientsService: ClientsService) { }
  
  /**
   * clientId validation by get product from products collection.
   * 
   * @param clientId product id
   * @param metadata metadata
   * @returns product category document if the product is found
   */
  async transform(clientId: string, metadata: ArgumentMetadata) {
    const client = await this.clientsService.findById(clientId);
    if (!client) throw new NotFoundException('خطأ في معرف المنتج.');
    return client;
  }
}