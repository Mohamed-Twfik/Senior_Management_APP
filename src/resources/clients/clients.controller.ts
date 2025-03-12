import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { UserDocument } from '../users/entities/user.entity';
import { ClientsDto } from './dto/client.dto';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { ClientIdPipe } from './pipes/client-id.pipe';
import { ClientDocument } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }
  
  @Post()
  @Redirect('/clients')
  create(
    @GetUser() user: UserDocument,
    @Body() clientDto: ClientsDto
  ) {
    return this.clientsService.create(clientDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.clientsService.findAll(queryParams, user);
  }

  @Post('update/:clientId')
  @Redirect()
  update(
    @Param('clientId', ObjectIdPipe, ClientIdPipe) client: ClientDocument,
    @Query(QueryParamPipe) queryParams: any,
    @Body() clientDto: ClientsDto,
    @GetUser() user: UserDocument,
  ) {
    return this.clientsService.updateRoute(client, clientDto, user, queryParams);
  }

  @Get('delete/:clientId')
  @Redirect()
  remove(
    @Param('clientId', ObjectIdPipe, ClientIdPipe) client: ClientDocument,
    @Query(QueryParamPipe) queryParams: any,
  ) {
    return this.clientsService.remove(client, queryParams);
  }
}
