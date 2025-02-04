import { Injectable } from '@nestjs/common';
import { ProductionService } from 'src/production/production.service';
import { UserDocument } from 'src/users/entities/user.entity';
import { arabicDateFormatter } from 'src/utils/arabic-date-formatter';

@Injectable()
export class MainService {
  constructor(private readonly productionService: ProductionService) { }

  private formatDate (date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  async main(user: UserDocument) {
    const today = new Date();
    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

    const productsStats = await this.productionService.getProductsStats(lastSaturday, today);
    const departmentsStats = await this.productionService.getDepartmentsStats(lastSaturday, today)
    
    return {
      formattedToday: this.formatDate(today),
      formattedLastSaturday: this.formatDate(lastSaturday),
      arabicLastSaturday: arabicDateFormatter.format(lastSaturday),
      arabicToday: arabicDateFormatter.format(today),
      productsStats,
      departmentsStats,
      user,
      title: 'الصفحة الرئيسية',
      type: 'main',
    };
  }
}
