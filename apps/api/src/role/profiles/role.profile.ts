import { AutoMapper, MappingProfileBase, Profile } from 'nestjsx-automapper';
import { Role } from '../models/role.model';
import { RoleVm } from '../view-models/role.vm';

@Profile()
class RoleProfile extends MappingProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Role, RoleVm)
      .forMember(
        d => d.permissions,
        opts => opts.mapFrom(s => s.permissions)
      )
      .reverseMap()
      .forPath(
        s => s.permissions,
        opts => opts.mapFrom(d => d.permissions)
      );
  }
}
