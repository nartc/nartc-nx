import { BaseVm } from '../../shared/base.model';
import { ExposedApiProperty } from '../../shared/decorators/swagger.decorators';

export class UserInformationVm extends BaseVm {
  @ExposedApiProperty()
  email: string;
  @ExposedApiProperty()
  firstName: string;
  @ExposedApiProperty()
  lastName: string;
  @ExposedApiProperty()
  fullName: string;
}
