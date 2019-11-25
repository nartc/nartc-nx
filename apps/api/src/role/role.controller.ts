import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiErrors,
  ApiOperationId
} from '../shared/decorators/swagger.decorators';
import { Role } from './models/role.model';
import { RoleService } from './role.service';
import { CreateRoleParamsVm } from './view-models/create-role-params.vm';

@Controller('roles')
@ApiTags(Role.modelName)
@ApiErrors()
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiOperationId()
  createRole(@Body() params: CreateRoleParamsVm): Promise<void> {
    return this._roleService.createRole(params);
  }
}
