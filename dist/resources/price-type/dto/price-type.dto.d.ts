import { Types } from "mongoose";
declare class departmentPrice {
    department: Types.ObjectId;
    price: number;
}
export declare class PriceTypeDto {
    name: string;
    departmentsPrice: departmentPrice[];
}
export {};
