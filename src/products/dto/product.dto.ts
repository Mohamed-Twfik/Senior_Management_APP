import { IsMongoId, IsNotEmpty, IsString, Matches } from "class-validator";
import { Types } from "mongoose";

export class ProductDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  category: Types.ObjectId;
}
