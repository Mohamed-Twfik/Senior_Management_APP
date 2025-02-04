import { Controller, Get, Render } from '@nestjs/common';
import { MainService } from './main.service';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';

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
