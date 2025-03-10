import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  PipeTransform
} from '@nestjs/common';
import { DepartmentsService } from '../../departments/departments.service';
import { BonusDto } from '../dto/bonus.dto';

/**
 * Validates bonus data.
 */
@Injectable()
export class BonusDataPipe implements PipeTransform {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  async transform(BonusData: BonusDto, metadata: ArgumentMetadata) {
    const department = await this.departmentsService.findById(BonusData.department.toString());
    if (!department) throw new NotFoundException('خطأ في معرف القسم.');
    BonusData.department = department._id;

    BonusData.to = (BonusData.to === 0)? Infinity : BonusData.to;
    if (BonusData.from >= BonusData.to) throw new NotAcceptableException('الحد الأدنى يجب أن يكون أقل من الحد الأعلى');

    return BonusData;
  }
}
