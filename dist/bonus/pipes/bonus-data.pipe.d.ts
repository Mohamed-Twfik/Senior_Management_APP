import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
export declare class BonusDataPipe implements PipeTransform {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(BonusData: any, metadata: ArgumentMetadata): Promise<any>;
}
