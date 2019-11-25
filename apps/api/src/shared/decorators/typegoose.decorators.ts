import { arrayProp, plugin, prop } from '@typegoose/typegoose';
import {
  ArrayPropOptions,
  Func,
  PropOptionsWithValidate
} from '@typegoose/typegoose/lib/types';
import {
  Expose,
  ExposeOptions,
  TypeHelpOptions,
  TypeOptions
} from 'class-transformer';
import { ExposedType } from 'nestjsx-automapper';

export const ExposedProp = (
  propOptions?: PropOptionsWithValidate,
  exposeOptions?: ExposeOptions
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  prop(propOptions)(target, propertyKey);
};

export const ExposedArrayProp = (
  arrayPropOptions?: ArrayPropOptions,
  exposeOptions?: ExposeOptions
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  arrayProp(arrayPropOptions)(target, propertyKey);
};

export const ExposedTypeProp = (
  typeFn: (opts?: TypeHelpOptions) => any,
  propOptions?: PropOptionsWithValidate,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions
) => (target: any, propertyKey: string) => {
  ExposedType(typeFn, exposeOptions, typeOptions)(target, propertyKey);
  prop(propOptions)(target, propertyKey);
};

export const ExposedTypeArrayProp = (
  typeFn: (opts?: TypeHelpOptions) => any,
  arrayPropOptions?: ArrayPropOptions,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions
) => (target: any, propertyKey: string) => {
  ExposedType(typeFn, exposeOptions, typeOptions)(target, propertyKey);
  arrayProp(arrayPropOptions)(target, propertyKey);
};

export const multiPlugins = (
  ...plugins: Array<{ plugin: Func; options?: any }>
) => {
  function decorator(target: any) {
    plugins.forEach(p => {
      plugin(p.plugin, p.options)(target);
    });
  }

  return decorator as any;
};
