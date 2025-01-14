import { Types } from "mongoose";
export declare class CreateWorkerDto {
    name: string;
    department: Types.ObjectId;
    salary: number;
}
