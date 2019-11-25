import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Permissions } from '../shared/decorators/permissions.decorator';
import {
  ApiErrors,
  ApiOperationId
} from '../shared/decorators/swagger.decorators';
import { PermissionsGuard } from '../shared/guards/permissions.guard';
import { PermissionPrivilege } from '../shared/permission.enum';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserVm } from './view-models/user.vm';

@Controller('users')
@ApiTags(User.modelName)
@ApiErrors()
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly _userService: UserService,
    @InjectMapper() private readonly _mapper: AutoMapper
  ) {}

  @Get()
  @UseGuards(AuthGuard(), PermissionsGuard)
  @Permissions({ user: PermissionPrivilege.Read })
  @ApiOkResponse({ type: UserVm, isArray: true })
  @ApiOperationId()
  async getUsers(): Promise<UserVm[]> {
    const users = await this._userService.findAllAsync();
    return this._mapper.mapArrayAsync(users, UserVm);
  }
}
