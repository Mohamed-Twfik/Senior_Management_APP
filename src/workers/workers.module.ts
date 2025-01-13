import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './entities/worker.entity';
import { UsersModule } from 'src/users/users.module';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
    ]),
    UsersModule,
    DepartmentsModule
  ],
  controllers: [WorkersController],
  providers: [WorkersService],
  exports: [WorkersService]
})
export class WorkersModule {}
