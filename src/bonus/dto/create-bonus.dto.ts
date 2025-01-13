import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Transform } from 'class-transformer';
import { Types } from "mongoose";

export class CreateBonusDto {
  @Transform(({ value }) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;
    else return numValue;
  })
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @Transform(({ value }) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;
    else return numValue;
  })
  @IsNumber()
  @IsNotEmpty()
  to: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  percentage: number;

  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;
}