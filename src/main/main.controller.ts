import { Controller, Get, Render } from '@nestjs/common';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) { }
  
  @Get()
  @Render('index')
  root(
    @GetUser() user: UserDocument
  ) {
    return this.mainService.main(user);
  }
}
