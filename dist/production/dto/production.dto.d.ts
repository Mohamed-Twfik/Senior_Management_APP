import { Types } from "mongoose";
declare class ProductionDetails {
    quantity: number;
    product: Types.ObjectId;
    department: Types.ObjectId;
}
export declare class ProductionDto {
    date: Date;
    worker: Types.ObjectId;
    productionDetails: ProductionDetails[];
}
export {};
