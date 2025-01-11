import { Document, Types } from "mongoose";
import { WorkerType } from "../enums/worker-type.enum";
export declare class Worker {
    name: string;
    type: WorkerType;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const WorkerSchema: import("mongoose").Schema<Worker, import("mongoose").Model<Worker, any, any, any, Document<unknown, any, Worker> & Worker & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Worker, Document<unknown, {}, import("mongoose").FlatRecord<Worker>> & import("mongoose").FlatRecord<Worker> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { WorkerSchema };
export type WorkerDocument = Worker & Document<Types.ObjectId>;
