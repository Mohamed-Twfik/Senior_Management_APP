import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
import { BonusDto } from '../dto/bonus.dto';
export declare class BonusDataPipe implements PipeTransform {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(BonusData: BonusDto, metadata: ArgumentMetadata): Promise<BonusDto>;
}
