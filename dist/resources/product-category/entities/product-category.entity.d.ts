import { Document, Types } from "mongoose";
export declare class ProductCategory {
    name: string;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const ProductCategorySchema: import("mongoose").Schema<ProductCategory, import("mongoose").Model<ProductCategory, any, any, any, Document<unknown, any, ProductCategory> & ProductCategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductCategory, Document<unknown, {}, import("mongoose").FlatRecord<ProductCategory>> & import("mongoose").FlatRecord<ProductCategory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { ProductCategorySchema };
export type ProductCategoryDocument = ProductCategory & Document<Types.ObjectId>;
