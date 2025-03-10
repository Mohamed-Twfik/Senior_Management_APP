import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/utils/classes/base.service';
import { UserDocument } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { ClientsDto } from './dto/client.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClientsService extends BaseService {
  searchableKeys: string[] = [
    "name"
  ];

  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private readonly usersService: UsersService
  ) {
    super();
  }

  getModuleModel(): Model<any> {
    return this.clientModel;
  }

  async getAdditionalRenderVariables(): Promise<object> {
    return {
      users: await this.usersService.find(),
      type: 'clients',
      title: 'العملاء'
    }
  }

  async create(createDto: ClientsDto, user: UserDocument): Promise<void> {
    const existProductCategory = await this.findOne({ name: createDto.name });
    if (existProductCategory) throw new ConflictException('إسم العميل موجود بالفعل');

    const inputDate: Client = {
      ...createDto,
      createdBy: user._id,
      updatedBy: user._id,
    }
    await this.clientModel.create(inputDate);
  }

  async update(entity: ClientDocument, updateDto: ClientsDto, user: UserDocument): Promise<void> {
    const existProductCategory = await this.findOne({
      $and: [
        { name: updateDto.name },
        { _id: { $ne: entity._id } }
      ]
    });
    if (existProductCategory) throw new ConflictException('إسم العميل موجود بالفعل');
    
    const inputData: Partial<Client> = {
      ...updateDto,
      updatedBy: user._id
    }

    await entity.set(inputData).save();
  }
}
