import { Transform, Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, Matches, ValidateNested } from "class-validator";
import { Types } from "mongoose";

class departmentPrice {
  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;

  @Transform(({value}) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class PriceTypeDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => departmentPrice)
  departmentsPrice: departmentPrice[];
}