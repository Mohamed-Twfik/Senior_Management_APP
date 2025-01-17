import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Matches } from "class-validator";

export class DepartmentDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  bonusLimit: number;
}
