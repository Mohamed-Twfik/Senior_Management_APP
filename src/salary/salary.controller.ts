import { Body, Controller, Get, Render } from "@nestjs/common";
import { GetSalaryDto } from "src/salary/dto/get-salary.dto";
import { SalaryService } from './salary.service';
import { GetUser } from "src/utils/decorators/get-user.decorator";
import { UserDocument } from "src/users/entities/user.entity";

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }
  
  @Get()
  @Render('index')
  async getSalary(
    @Body() getSalaryDto: GetSalaryDto,
    @GetUser() user: UserDocument
  ) {
    return this.salaryService.getSalary(getSalaryDto, user);
  }
}