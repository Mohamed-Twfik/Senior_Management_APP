import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';

/**
 * Validates bonus data.
 */
@Injectable()
export class BonusDataPipe implements PipeTransform {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  async transform(BonusData: any, metadata: ArgumentMetadata) {
    if (BonusData.department) {
      const department = await this.departmentsService.findById(BonusData.department);
      if (!department) throw new NotFoundException('خطأ في معرف القسم.');
    }
    return BonusData;
  }
}
