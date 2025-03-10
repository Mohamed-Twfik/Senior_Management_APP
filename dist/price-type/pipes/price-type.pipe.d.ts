import { ArgumentMetadata } from "@nestjs/common";
import { DepartmentsService } from "src/departments/departments.service";
import { PriceType } from "../entities/price-type.entity";
export declare class PriceTypePipe {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    transform(data: PriceType, metadata: ArgumentMetadata): Promise<PriceType>;
}
