import { UserDocument } from 'src/resources/users/entities/user.entity';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from './dto/department.dto';
import { DepartmentDocument } from './entities/department.entity';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(user: UserDocument, createDepartmentDto: DepartmentDto): Promise<void>;
    findAll(queryParams: any, user: UserDocument): Promise<import("../users/types/base-render-variables.type").BaseRenderVariablesType>;
    update(department: DepartmentDocument, queryParams: any, updateDepartmentDto: DepartmentDto, user: UserDocument): Promise<{
        url: string;
    }>;
    remove(department: DepartmentDocument, queryParams: any): Promise<object>;
}
