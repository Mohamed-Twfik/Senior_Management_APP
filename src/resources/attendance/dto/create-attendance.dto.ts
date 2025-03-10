import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateAttendanceDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  date: Date;
  
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  worker: Types.ObjectId[];
}
