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
import { UserDocument } from 'src/resources/users/entities/user.entity';
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
  @Redirect()
  update(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Query(QueryParamPipe) queryParams: any,
    @Body(BonusDataPipe) updateBonusDto: BonusDto,
    @GetUser() user: UserDocument,
  ) {
    return this.bonusService.updateRoute(bonus, updateBonusDto, user, queryParams);
  }

  @Get('delete/:bonusId')
  @Redirect()
  remove(
    @Param('bonusId', ObjectIdPipe, BonusIdPipe) bonus: BonusDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.bonusService.remove(bonus, queryParams);
  }
}
