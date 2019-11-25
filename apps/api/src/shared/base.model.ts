import { buildSchema } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { Schema } from 'mongoose';
import {
  ExposedApiProperty,
  ExposedApiPropertyOptional
} from './decorators/swagger.decorators';
import { ExposedProp } from './decorators/typegoose.decorators';

export class BaseModel {
  @ExposedProp()
  createdAt?: Date;
  @ExposedProp()
  updatedAt?: Date;
  @ExposedProp({ required: true, default: true, index: true })
  isActive: boolean;
  @Expose()
  id?: string;

  static get schema(): Schema {
    return buildSchema(this, {
      timestamps: true,
      toJSON: {
        getters: true,
        virtuals: true
      },
      id: true
    });
  }

  static get modelName(): string {
    return this.name;
  }
}

export class BaseVm {
  @ExposedApiPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;
  @ExposedApiPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;
  @ExposedApiPropertyOptional()
  id?: string;
  @ExposedApiProperty()
  isActive: boolean;
}
