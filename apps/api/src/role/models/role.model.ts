import { plugin } from '@typegoose/typegoose';
import * as leanVirtuals from 'mongoose-lean-virtuals';

import { BaseModel } from '../../shared/base.model';
import { ExposedProp } from '../../shared/decorators/typegoose.decorators';
import { PermissionDictionary } from '../../shared/permission.types';

@plugin(leanVirtuals)
export class Role extends BaseModel {
  @ExposedProp({ default: false })
  isGlobal: boolean;
  @ExposedProp({ default: '', required: false })
  parentId?: string;
  @ExposedProp({
    required: true,
    unique: true,
    index: true,
    text: true,
    maxlength: 255,
    minlength: 6
  })
  roleName: string;
  @ExposedProp({ required: true, maxlength: 255, minlength: 6 })
  notes: string;
  @ExposedProp({ required: true, default: {} })
  permissions: PermissionDictionary;
}
