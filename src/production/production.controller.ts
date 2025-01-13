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
import { GetSalaryDto } from 'src/production/dto/get-salary.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ProductionDocument } from './entities/production.entity';
import { CreateProductionPipe } from './pipes/create-production-price.pipe';
import { ProductionIdPipe } from './pipes/production-id.pipe';
import { ProductionService } from './production.service';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  @Redirect('/production')
  create(
    @Body(CreateProductionPipe) createProductionDto: CreateProductionDto,
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
  @Redirect('/production')
  update(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument,
    @Body() updateProductionDto: UpdateProductionDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productionService.update(production, updateProductionDto, user);
  }

  @Get('delete/:productionId')
  @Redirect('/production')
  remove(
    @Param('productionId', ObjectIdPipe, ProductionIdPipe) production: ProductionDocument
  ) {
    return this.productionService.remove(production);
  }

  @Post('salary')
  @Render('salary')
  getSalary(
    @Body() getSalaryDto: GetSalaryDto,
    @GetUser() user: UserDocument,
    @Query('error') error: string
  ) {
    return this.productionService.getSalary(getSalaryDto, user, error);
  }
}
