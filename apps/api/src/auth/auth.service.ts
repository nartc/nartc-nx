import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from '../environments/environment';
import { Role } from '../role/models/role.model';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { UserInformationVm } from '../user/view-models/user-information.vm';
import { AuthUser } from './auth-user';
import { JwtPayload } from './jwt-payload';
import { LoginParamsVm } from './view-models/login-params.vm';
import { LoginResultVm } from './view-models/login-result.vm';
import { RegisterParamsVm } from './view-models/register-params.vm';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _roleService: RoleService,
    private readonly _jwtService: JwtService,
    @InjectMapper() private readonly _mapper: AutoMapper
  ) {}

  private static async comparePassword(
    password: string,
    encrypted: string
  ): Promise<boolean> {
    try {
      return await compare(password, encrypted);
    } catch (e) {
      throw new InternalServerErrorException(`Error: ${e}`);
    }
  }

  private static async hashPassword(data: string): Promise<string> {
    try {
      const salt = await genSalt(environment.auth.salt);
      return await hash(data, salt);
    } catch (e) {
      throw new InternalServerErrorException(`Error: ${e}`);
    }
  }

  private authenticate(email: string, roleId: string): Promise<string> {
    const payload: JwtPayload = { email, roleId };
    return this._jwtService.signAsync(payload);
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this._userService.findByEmail(payload.email);
    return this._mapper.mapAsync(user, AuthUser);
  }

  async register(params: RegisterParamsVm): Promise<void> {
    const { email, password } = params;
    const user = await this._userService.findByEmail(email);

    if (user) {
      throw new BadRequestException(null, 'Email already exists');
    }

    const newUser = this._userService.createModel(params);
    newUser.password = await AuthService.hashPassword(password);
    newUser.role = await this._roleService.findStandardUserRole();
    await this._userService.create(newUser);
  }

  async login(params: LoginParamsVm): Promise<LoginResultVm> {
    const { password, email } = params;
    const user = await this._userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(email, 'Wrong credentials');
    }

    const isMatched = await AuthService.comparePassword(
      password,
      user.password
    );
    if (!isMatched) {
      throw new BadRequestException(password, 'Wrong credentials');
    }

    const token = await this.authenticate(email, (user.role as Role).id);

    const result = new LoginResultVm();
    result.token = token;
    result.user = await this._mapper.mapAsync(user, UserInformationVm);
    return result;
  }
}
