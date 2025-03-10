import { ArgumentMetadata, Injectable, NotAcceptableException } from "@nestjs/common";
import { DepartmentsService } from "src/resources/departments/departments.service";
import { PriceType } from "../entities/price-type.entity";

/**
 * Create price type pipe.
 */
@Injectable()
export class PriceTypePipe {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) { }
  /**
   * Transform price type data to save it in the database.
   * 
   * @param data price type data
   * @param metadata metadata
   * @returns transformed price type data
   */
  async transform(data: PriceType, metadata: ArgumentMetadata) {
    for (const departmentPrice of data.departmentsPrice) {
      const departmentExists = await this.departmentsService.findById(departmentPrice.department.toString());
      if (!departmentExists) throw new NotAcceptableException('خطأ في معرف القسم.');
      departmentPrice.department = departmentExists._id;
    }

    return data;
  }
}