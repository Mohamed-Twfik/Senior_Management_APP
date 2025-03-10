import { Types } from "mongoose";
export declare class BonusDto {
    from: number;
    to: number;
    percentage: number;
    department: Types.ObjectId;
}
