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
import { ProductPriceDto } from './dto/product-price.dto';
import { ProductPriceDocument } from './entities/product-price.entity';
import { ProductPriceIdPipe } from './pipes/product-price-id.pipe';
import { ProductPricePipe } from './pipes/product-price.pipe';
import { ProductPriceService } from './product-price.service';

@Controller('productPrice')
export class ProductPriceController {
  constructor(private readonly productPriceService: ProductPriceService) {}

  @Post()
  @Redirect('/productPrice')
  create(
    @Body(ProductPricePipe) createProductPriceDto: ProductPriceDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.create(createProductPriceDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.findAll(queryParams, user);
  }

  @Post('update/:productPriceId')
  @Redirect('/productPrice?sort=-updatedAt')
  update(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
    @Body(ProductPricePipe) updateProductPriceDto: ProductPriceDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productPriceService.update(productPrice, updateProductPriceDto, user);
  }

  @Get('delete/:productPriceId')
  @Redirect('/productPrice')
  remove(
    @Param('productPriceId', ObjectIdPipe, ProductPriceIdPipe) productPrice: ProductPriceDocument,
  ) {
    return this.productPriceService.remove(productPrice);
  }
}
