import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ProductCategoryDto } from './dto/product-category.dto';
import { ProductCategoryDocument } from './entities/product-category.entity';
import { ProductCategoryIdPipe } from './pipes/product-category-id.pipe';
import { ProductCategoryService } from './product-category.service';

@Controller('productCategory')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) { }

  @Post()
  @Redirect('/productCategory')
  create(
    @GetUser() user: UserDocument,
    @Body() productCategoryDto: ProductCategoryDto
  ) {
    return this.productCategoryService.create(productCategoryDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.productCategoryService.findAll(queryParams, user);
  }

  @Post('update/:productCategoryId')
  @Redirect('/productCategory?sort=-updatedAt')
  update(
    @Param('productCategoryId', ObjectIdPipe, ProductCategoryIdPipe) productCategory: ProductCategoryDocument,
    @Body() productCategoryDto: ProductCategoryDto,
    @GetUser() user: UserDocument,
  ) {
    return this.productCategoryService.update(productCategory, productCategoryDto, user);
  }

  @Get('delete/:productCategoryId')
  @Redirect('/productCategory')
  remove(
    @Param('productCategoryId', ObjectIdPipe, ProductCategoryIdPipe) productCategory: ProductCategoryDocument,
  ) {
    return this.productCategoryService.remove(productCategory);
  }
}
