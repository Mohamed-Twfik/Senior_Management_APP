import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render
} from '@nestjs/common';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { BonusService } from './bonus.service';
import { BonusDto } from './dto/bonus.dto';
import { BonusDocument } from './entities/bonus.entity';
import { BonusDataPipe } from './pipes/bonus-data.pipe';
import { BonusIdPipe } from './pipes/bonus-id.pipe';

@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post()
  @Redirect('/bonus')
  create(
    @Body(BonusDataPipe) createBonusDto: BonusDto,
    @GetUser() user: UserDocument
  ) {
    return this.bonusService.create(createBonusDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.findAll(queryParams, user);
  }

  @Post('update/:bonusId')
  @Redirect('/bonus?sort=-updatedAt')
  update(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Body(BonusDataPipe) updateBonusDto: BonusDto,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.update(bonus, updateBonusDto, user);
  }

  @Get('delete/:bonusId')
  @Redirect('/bonus')
  remove(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
  ) {
    return this.bonusService.remove(bonus);
  }
}
