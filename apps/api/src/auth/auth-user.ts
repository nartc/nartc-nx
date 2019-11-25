import { Expose } from 'class-transformer';
import { ExposedType } from 'nestjsx-automapper';
import { Role } from '../role/models/role.model';
import { BaseVm } from '../shared/base.model';

export class AuthUser extends BaseVm {
  @Expose()
  email: string;
  @ExposedType(() => Role)
  role: Role;
  @Expose()
  isSuper: boolean;
}
