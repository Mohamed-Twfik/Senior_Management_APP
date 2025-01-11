import { Injectable } from '@nestjs/common';
import { GetSalaryDto } from './dtos/get-salary.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { ProductionService } from '../production/production.service';
import { BonusService } from 'src/bonus/bonus.service';

@Injectable()
export class SalaryService {
  constructor(
    private readonly productionService: ProductionService,
    private readonly bonusService: BonusService
  ) { }

  /**
   * Get salary for all workers.
   * @param getSalaryDto The data to get the salary.
   * @param queryParams The query parameters for filters.
   * @param user The user who is getting the salary.
   */
  async getSalary(getSalaryDto: GetSalaryDto, user: UserDocument, error: string) {
    const productions = await this.productionService.find({
      date: {
        $gte: getSalaryDto.from,
        $lte: getSalaryDto.to
      }
    })
      .populate('worker')
      .populate('product', 'name')
      .populate('department', 'name');
    
    const workerSalaries = new Map();
    
    productions.forEach((production) => {
      const workerId = production.worker._id.toString();
      const cost = production.cost;

      // if (production.worker.type === WorkerType.PRODUCTION) {
      //   if (!workerSalaries.has(workerId)) {
      //     workerSalaries.set(workerId, { name: (production.worker as any).name, salary: 0, bonus: 0, total: 0 });
      //   }
        
      //   const workerData = workerSalaries.get(workerId);
      //   workerData.salary += cost;
      // } else if (production.worker.type === WorkerType.HOURLY) { }
        
      
    });
    const salaries = Array.from(workerSalaries.values())
    
    for (const salary of salaries) {
      const bonusPresent = (await this.bonusService.find({
        from: {
          $lte: salary.salary
        },
        to: {
          $gte: salary.salary
        }
      }))[0];
      salary.bonus = bonusPresent ? (bonusPresent.percentage / 100) * salary.salary : 0;
      salary.total = salary.salary + salary.bonus;
    };
    return { data: salaries, user, error: error || null };
  }
}
