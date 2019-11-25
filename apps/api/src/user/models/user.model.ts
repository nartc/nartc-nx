import { plugin, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import * as leanVirtuals from 'mongoose-lean-virtuals';
import { Role } from '../../role/models/role.model';
import { BaseModel } from '../../shared/base.model';
import {
  ExposedProp,
  ExposedTypeProp
} from '../../shared/decorators/typegoose.decorators';

@plugin(autopopulate)
@plugin(leanVirtuals)
export class User extends BaseModel {
  @ExposedProp({ default: false })
  isSuper: boolean;
  @ExposedProp({
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
    text: true
  })
  email: string;
  @ExposedProp({ required: true, minlength: 1, maxlength: 100, index: true })
  firstName: string;
  @ExposedProp({ required: true, minlength: 1, maxlength: 100, index: true })
  lastName: string;
  @ExposedProp({ required: true, minlength: 6 })
  password: string;
  @ExposedTypeProp(() => Role, { ref: Role, autopopulate: true, default: null })
  role: Ref<Role>;
}
