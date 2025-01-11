import { Body, Controller, Get, Query } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { GetSalaryDto } from './dtos/get-salary.dto';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }
  
  @Get()
  getSalary(
    @Body() getSalaryDto: GetSalaryDto,
    @GetUser() user: UserDocument,
    @Query('error') error: string
  ) {
    return this.salaryService.getSalary(getSalaryDto, user, error);
  }
}
