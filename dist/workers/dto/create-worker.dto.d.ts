import { Types } from "mongoose";
import { WorkerType } from "../enums/workerType.enum";
export declare class CreateWorkerDto {
    name: string;
    type: WorkerType;
    department: Types.ObjectId;
    salary: number;
}
