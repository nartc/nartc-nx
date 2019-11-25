import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from '../shared/base.service';
import { Role } from './models/role.model';
import { CreateRoleParamsVm } from './view-models/create-role-params.vm';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectModel(Role.modelName) private readonly _roleModel: ModelType<Role>
  ) {
    super(_roleModel);
  }

  async createRole(params: CreateRoleParamsVm): Promise<void> {
    const newRole = this.createModel(params);
    await this.create(newRole);
  }

  findStandardUserRole(): Promise<Role> {
    return this.findOneAsync({ roleName: 'Standard User' });
  }
}
