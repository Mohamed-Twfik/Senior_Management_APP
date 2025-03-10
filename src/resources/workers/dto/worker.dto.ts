import { IsEnum, IsInt, IsMongoId, IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";
import { Types } from "mongoose";
import { WorkerType } from "../enums/workerType.enum";

export class WorkerDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(WorkerType)
  type: WorkerType;

  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;
  
  @ValidateIf(o => (o.type === WorkerType.Weekly || o.type === WorkerType.Hybrid))
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  salary: number;
}
