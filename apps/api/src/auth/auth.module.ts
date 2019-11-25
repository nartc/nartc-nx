import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../environments/environment';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: environment.auth.secret,
      signOptions: {
        expiresIn: environment.auth.expired
      }
    }),
    UserModule,
    RoleModule
  ],
  providers: [AuthService, JwtStrategyService]
})
export class AuthModule {}
