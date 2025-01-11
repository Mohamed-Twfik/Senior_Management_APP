import { IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class CreateWorkerDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  salary: number;
}
