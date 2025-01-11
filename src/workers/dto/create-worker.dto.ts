import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { WorkerType } from "../enums/worker-type.enum";

export class CreateWorkerDto {
  @IsString()
  @Matches(/^[\s\S]{3,}$/, { message: 'الإسم يجب أن يكون 3 أحرف على الأقل' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(WorkerType)
  @IsNotEmpty()
  type: WorkerType;
}
