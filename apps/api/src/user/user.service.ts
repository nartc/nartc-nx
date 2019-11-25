import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from '../shared/base.service';
import { User } from './models/user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>
  ) {
    super(_userModel);
  }

  findByEmail(email: string): Promise<User> {
    return this.findOneAsync({ email });
  }
}
