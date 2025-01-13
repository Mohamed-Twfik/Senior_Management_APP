import { Types } from "mongoose";
export declare class CreateBonusDto {
    from: number;
    to: number;
    percentage: number;
    department: Types.ObjectId;
}
