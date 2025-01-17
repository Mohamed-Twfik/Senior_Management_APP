import { Types } from "mongoose";
export declare class ProductionDto {
    date: Date;
    quantity: number;
    product: Types.ObjectId;
    worker: Types.ObjectId;
    department: Types.ObjectId;
}
