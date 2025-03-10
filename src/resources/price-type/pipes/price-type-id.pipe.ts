import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { PriceTypeService } from '../price-type.service';

/**
 * Validates PriceTypeId if exist.
 */
@Injectable()
export class PriceTypeIdPipe implements PipeTransform {
  constructor(private readonly priceTypeService: PriceTypeService) { }
  
  /**
   * PriceTypeId validation by get price type.
   * 
   * @param priceTypeId price type id
   * @param metadata metadata
   * @returns price type document if exist
   */
  async transform(priceTypeId: string, metadata: ArgumentMetadata) {
    const priceType = await this.priceTypeService.findById(priceTypeId);
    if (!priceType) throw new NotFoundException('خطأ في معرف نوع السعر.');
    return priceType;
  }
}