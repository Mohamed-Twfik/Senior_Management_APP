import { Injectable } from '@nestjs/common';
import { ProductionService } from 'src/resources/production/production.service';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { arabicDateFormatter } from 'src/utils/arabic-date-formatter';
import { lastSaturday, lastSaturdayFormatted, today, todayFormatted } from 'src/utils/input-field-date-format';

@Injectable()
export class MainService {
  constructor(private readonly productionService: ProductionService) { }

  async main(user: UserDocument) {
    const productsStats = await this.productionService.getProductsStats(lastSaturday, today);
    const departmentsStats = await this.productionService.getDepartmentsStats(lastSaturday, today)
    
    return {
      formattedToday: todayFormatted,
      formattedLastSaturday: lastSaturdayFormatted,
      arabicLastSaturday: arabicDateFormatter.format(lastSaturday),
      arabicToday: arabicDateFormatter.format(today),
      salaryForm: {
        from: lastSaturdayFormatted,
        to: todayFormatted
      },
      productsStats,
      departmentsStats,
      user,
      title: 'الصفحة الرئيسية',
      type: 'main',
    };
  }
}
