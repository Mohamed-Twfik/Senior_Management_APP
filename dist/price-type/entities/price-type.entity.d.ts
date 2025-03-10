import { Document, Types } from "mongoose";
declare class DepartmentPrice {
    department: Types.ObjectId;
    price: number;
}
export declare class PriceType {
    name: string;
    departmentsPrice: DepartmentPrice[];
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const PriceTypeSchema: import("mongoose").Schema<PriceType, import("mongoose").Model<PriceType, any, any, any, Document<unknown, any, PriceType> & PriceType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PriceType, Document<unknown, {}, import("mongoose").FlatRecord<PriceType>> & import("mongoose").FlatRecord<PriceType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { PriceTypeSchema };
export type PriceTypeDocument = PriceType & Document<Types.ObjectId>;
