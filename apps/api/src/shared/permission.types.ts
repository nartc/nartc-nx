import { PermissionScore } from './permission.enum';

export type DomainModels = 'role' | 'user';
export type PermissionDictionary = {
  [key in DomainModels]?: PermissionScore;
};
