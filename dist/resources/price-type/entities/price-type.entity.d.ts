import mongoose, { Document, Types } from "mongoose";
export declare class PriceType {
    name: string;
    departmentsPrice: {
        department: Types.ObjectId;
        price: number;
    }[];
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const PriceTypeSchema: mongoose.Schema<PriceType, mongoose.Model<PriceType, any, any, any, mongoose.Document<unknown, any, PriceType> & PriceType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PriceType, mongoose.Document<unknown, {}, mongoose.FlatRecord<PriceType>> & mongoose.FlatRecord<PriceType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { PriceTypeSchema };
export type PriceTypeDocument = PriceType & Document<Types.ObjectId>;
