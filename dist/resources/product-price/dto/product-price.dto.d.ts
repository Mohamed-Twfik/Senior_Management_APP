import { Types } from "mongoose";
export declare class ProductPriceDto {
    readonly price: number;
    product: Types.ObjectId;
    department: Types.ObjectId;
}
