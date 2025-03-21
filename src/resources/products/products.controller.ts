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
import { ProductDto } from './dto/product.dto';
import { ProductDocument } from './entities/product.entity';
import { ProductIdPipe } from './pipes/product-id.pipe';
import { ProductsService } from './products.service';
import { ProductPipe } from './pipes/product.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Redirect('/products')
  create(
    @GetUser() user: UserDocument,
    @Body(ProductPipe) createProductDto: ProductDto
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Render('index')
  async findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productsService.findAll(queryParams, user);
  }

  @Post('update/:productId')
  @Redirect()
  update(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
    @Query(QueryParamPipe) queryParams: any,
    @Body(ProductPipe) updateProductDto: ProductDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productsService.updateRoute(product, updateProductDto, user, queryParams);
  }

  @Get('delete/:productId')
  @Redirect()
  remove(
    @Param('productId', ObjectIdPipe, ProductIdPipe) product: ProductDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.productsService.remove(product, queryParams);
  }
}
