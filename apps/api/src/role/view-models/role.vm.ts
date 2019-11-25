import { BaseVm } from '../../shared/base.model';
import {
  ExposedApiProperty,
  ExposedApiPropertyOptional
} from '../../shared/decorators/swagger.decorators';
import { PermissionDictionary } from '../../shared/permission.types';

export class RoleVm extends BaseVm {
  @ExposedApiProperty()
  isGlobal: boolean;
  @ExposedApiPropertyOptional()
  parentId?: string;
  @ExposedApiProperty()
  roleName: string;
  @ExposedApiProperty()
  notes: string;
  @ExposedApiProperty({ default: {} })
  permissions: PermissionDictionary;
}
