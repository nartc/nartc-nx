import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User } from './models/user.model';
import './profiles/user.profile';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.modelName, schema: User.schema }])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
