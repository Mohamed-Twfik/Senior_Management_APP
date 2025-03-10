import { Body, Controller, Post, Render } from "@nestjs/common";
import { GetSalaryDto } from "src/resources/salary/dto/get-salary.dto";
import { UserDocument } from "src/resources/users/entities/user.entity";
import { GetUser } from "src/utils/decorators/get-user.decorator";
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }
  
  @Post()
  @Render('index')
  async getSalary(
    @Body() getSalaryDto: GetSalaryDto,
    @GetUser() user: UserDocument
  ) {
    return this.salaryService.getSalary(getSalaryDto, user);
  }
}