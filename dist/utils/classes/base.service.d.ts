import { Document, Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/resources/users/types/base-render-variables.type';
import { QueryDto } from '../dtos/query.dto';
import { FindQueryBuilderService } from './find-query-builder.service';
export declare abstract class BaseService {
    private queryBuilder;
    getQueryBuilder(queryParams: QueryDto, filter?: RootFilterQuery<any>): FindQueryBuilderService;
    find(filter?: RootFilterQuery<any>): import("mongoose").Query<any[], any, {}, any, "find", {}>;
    applyFilters(queryBuilder: FindQueryBuilderService): import("mongoose").Query<any, any, {}, unknown, "find", Record<string, never>>;
    findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType>;
    findById(id: string): Promise<any>;
    findOne(filter: RootFilterQuery<any>): Promise<any>;
    updateMany(filter: RootFilterQuery<any>, updateDto: any): Promise<any>;
    removeMany(filter: RootFilterQuery<any>): Promise<any>;
    remove(entity: Document, queryParams: QueryDto): Promise<object>;
    setQueryFilters(queryParams: QueryDto): Promise<{
        url: string;
    }>;
    updateRoute(entity: Document, updateDto: any, userDocument: UserDocument, queryParams: QueryDto): Promise<{
        url: string;
    }>;
    abstract getModuleModel(): Model<any>;
    abstract getAdditionalRenderVariables(): Promise<object>;
    abstract create(createDto: any, userDocument: UserDocument): Promise<void>;
    abstract update(entity: Document, updateDto: any, userDocument: UserDocument): Promise<void>;
}
