import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class CreateWorkerDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  salary: number;
}
