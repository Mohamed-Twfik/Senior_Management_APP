import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsMongoId, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Types } from "mongoose";

class ProductionDetails {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsMongoId()
  product: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  department: Types.ObjectId;
}

export class ProductionDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @IsMongoId()
  worker: Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductionDetails)
  productionDetails: ProductionDetails[];
}
