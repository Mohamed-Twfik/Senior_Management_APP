import { Document, Types } from "mongoose";
export declare class Attendance {
    date: Date;
    worker: Types.ObjectId;
    price: number;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    arabicDate?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const AttendanceSchema: import("mongoose").Schema<Attendance, import("mongoose").Model<Attendance, any, any, any, Document<unknown, any, Attendance> & Attendance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attendance, Document<unknown, {}, import("mongoose").FlatRecord<Attendance>> & import("mongoose").FlatRecord<Attendance> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { AttendanceSchema };
export type AttendanceDocument = Attendance & Document<Types.ObjectId>;
