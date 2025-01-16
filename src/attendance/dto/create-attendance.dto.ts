import { Transform } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateAttendanceDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  date: Date;
  
  @IsNotEmpty()
  @IsMongoId()
  worker: Types.ObjectId;
}
