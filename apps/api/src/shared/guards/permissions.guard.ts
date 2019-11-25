import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthUser } from '../../auth/auth-user';
import { PERMISSIONS_DECORATOR } from '../decorators/permissions.decorator';
import { PermissionPrivilege } from '../permission.enum';
import { PermissionDictionary } from '../permission.types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const routePermissions = this._reflector.get<
      { [key in keyof PermissionDictionary]?: PermissionPrivilege }
    >(PERMISSIONS_DECORATOR, context.getHandler());

    if (!routePermissions || !Object.keys(routePermissions).length) {
      return true;
    }

    const currentUser = context.switchToHttp().getRequest<Request>()
      .user as AuthUser;

    const hasPermission = () =>
      Object.entries(currentUser.role.permissions).every(
        ([key, score]) =>
          !routePermissions[key] || score >= routePermissions[key]
      );

    return currentUser && (currentUser.isSuper || hasPermission());
  }
}
