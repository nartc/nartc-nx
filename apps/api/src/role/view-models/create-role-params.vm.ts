import {
  ExposedApiProperty,
  ExposedApiPropertyOptional
} from '../../shared/decorators/swagger.decorators';
import { PermissionDictionary } from '../../shared/permission.types';

export class CreateRoleParamsVm {
  @ExposedApiProperty({ default: false, description: 'Is this role Global?' })
  isGlobal: boolean;
  @ExposedApiPropertyOptional({
    description: 'Id of Role that this Role can extend'
  })
  parentId?: string;
  @ExposedApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'Standard User',
    description: 'Name of Role'
  })
  roleName: string;
  @ExposedApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'This is a standard user',
    description: 'Description of Role'
  })
  notes: string;
  @ExposedApiProperty({
    default: {},
    description: 'Permissions dictionary for this role',
    example: { user: 7, role: 1 }
  })
  permissions?: PermissionDictionary;
}
