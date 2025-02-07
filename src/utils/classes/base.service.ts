import { Document, Model, RootFilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { BaseRenderVariablesType } from 'src/users/types/base-render-variables.type';
import { QueryDto } from '../dtos/query.dto';
import { FindQueryBuilderService } from './find-query-builder.service';
import { lastSaturdayFormatted, todayFormatted } from '../input-field-date-format';

export abstract class BaseService {
  private queryBuilder: FindQueryBuilderService | null = null;
  
  getQueryBuilder(queryParams: QueryDto, filter: RootFilterQuery<any> = {}) { 
    const query = this.getModuleModel().find(filter);
    if (!this.queryBuilder) this.queryBuilder = new FindQueryBuilderService(query, queryParams);
    else this.queryBuilder.resetParameters(query, queryParams);
    return this.queryBuilder;
  }
  
  find(filter: RootFilterQuery<any> = {}) {
    return this.getModuleModel().find(filter);
  };

  applyFilters(queryBuilder: FindQueryBuilderService) {
    return queryBuilder
      .filter()
      .sort()
      .paginate()
      .build()
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');
  }

  async findAll(queryParams: QueryDto, user: UserDocument): Promise<BaseRenderVariablesType> {
    const { error, ...queryParamsForQuery } = queryParams;
    const queryBuilder = this.getQueryBuilder(queryParamsForQuery);
    const data = await this.applyFilters(queryBuilder);

    const baseRenderVariables: BaseRenderVariablesType = {
      error: error || null,
      data,
      user,
      todayDate: todayFormatted,
      salaryForm: {
        from: lastSaturdayFormatted,
        to: todayFormatted
      },
      filters: {
        search: queryBuilder.getSearchKey(),
        sort: queryBuilder.getSortKey(),
        pagination: {
          page: queryBuilder.getPage(),
          totalPages: await queryBuilder.getTotalPages(),
          pageSize: queryBuilder.getPageSize()
        },
        ...queryBuilder.getCustomFilters()
      }
    };
    const renderVariables = { ...baseRenderVariables, ...(await this.getAdditionalRenderVariables()) };
    return renderVariables;
  }

  findById(id: string): Promise<any> {
    return this.getModuleModel().findById(id);
  };

  findOne(filter: RootFilterQuery<any>): Promise<any> {
    return this.getModuleModel().findOne(filter);
  };
  
  updateMany(filter: RootFilterQuery<any>, updateDto: any): Promise<any> {
    return this.getModuleModel().updateMany(filter, updateDto);
  }
  
  removeMany(filter: RootFilterQuery<any>): Promise<any> {
    return this.getModuleModel().deleteMany(filter);
  }

  async remove(entity: Document): Promise<void> {
    await this.getModuleModel().findByIdAndDelete(entity._id);
  }

  abstract getModuleModel(): Model<any>;
  abstract getAdditionalRenderVariables(): Promise<object>;
  abstract create(createDto: any, userDocument: UserDocument): Promise<void>;
  abstract update(entity: Document, updateDto: any, userDocument: UserDocument): Promise<void>;
}