import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { PriceTypeService } from '../price-type.service';
export declare class PriceTypeIdPipe implements PipeTransform {
    private readonly priceTypeService;
    constructor(priceTypeService: PriceTypeService);
    transform(priceTypeId: string, metadata: ArgumentMetadata): Promise<any>;
}
