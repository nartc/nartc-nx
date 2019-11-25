import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiErrors,
  ApiOperationId
} from '../shared/decorators/swagger.decorators';
import { AuthService } from './auth.service';
import { LoginParamsVm } from './view-models/login-params.vm';
import { LoginResultVm } from './view-models/login-result.vm';
import { RegisterParamsVm } from './view-models/register-params.vm';

@Controller('auth')
@ApiTags('Auth')
@ApiErrors()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse()
  @ApiOperationId()
  register(@Body() params: RegisterParamsVm): Promise<void> {
    return this._authService.register(params);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResultVm })
  @ApiOperationId()
  login(@Body() params: LoginParamsVm): Promise<LoginResultVm> {
    return this._authService.login(params);
  }
}
