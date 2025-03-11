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
  @Redirect('/clients?sort=-updatedAt')
  update(
    @Param('clientId', ObjectIdPipe, ClientIdPipe) client: ClientDocument,
    @Body() clientDto: ClientsDto,
    @GetUser() user: UserDocument,
  ) {
    return this.clientsService.update(client, clientDto, user);
  }

  @Get('delete/:clientId')
  @Redirect('/clients')
  remove(
    @Param('clientId', ObjectIdPipe, ClientIdPipe) client: ClientDocument,
  ) {
    return this.clientsService.remove(client);
  }
}
