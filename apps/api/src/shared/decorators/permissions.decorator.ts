import { SetMetadata } from '@nestjs/common';
import { PermissionPrivilege } from '../permission.enum';
import { PermissionDictionary } from '../permission.types';

export const PERMISSIONS_DECORATOR = 'allowed:permissions';
export const Permissions = (
  permissions: { [key in keyof PermissionDictionary]?: PermissionPrivilege }
) => SetMetadata(PERMISSIONS_DECORATOR, permissions);
