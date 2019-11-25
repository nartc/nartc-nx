import { ApiProperty } from '@nestjs/swagger';
import { UserInformationVm } from '../../user/view-models/user-information.vm';

export class LoginResultVm {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: () => UserInformationVm })
  user: UserInformationVm;
}
