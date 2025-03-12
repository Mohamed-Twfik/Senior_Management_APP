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
import { ProductionDto } from './dto/production.dto';
import { ProductionDocument } from './entities/production.entity';
import { ProductionDataPipe } from './pipes/production-data.pipe';
import { ProductionIdPipe } from './pipes/production-id.pipe';
import { ProductionService } from './production.service';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  @Redirect('/production')
  create(
    @Body(ProductionDataPipe) createProductionDto: ProductionDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.create(createProductionDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.findAll(queryParams, user);
  }

  @Post('update/:productionId')
  @Redirect()
  update(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Query(QueryParamPipe) queryParams: any,
    @Body(ProductionDataPipe) updateProductionDto: ProductionDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.updateRoute(production, updateProductionDto, user, queryParams);
  }

  @Get('delete/:productionId')
  @Redirect()
  remove(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.productionService.remove(production, queryParams);
  }
}
