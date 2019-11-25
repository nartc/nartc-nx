import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions
} from '@nestjs/swagger';
import { Expose, ExposeOptions, TypeOptions } from 'class-transformer';
import { ExposedType } from 'nestjsx-automapper';
import { ApiException } from '../api-exception.model';

export const ExposedApiProperty = (
  metadata?: ApiPropertyOptions,
  exposeOptions?: ExposeOptions
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  ApiProperty(metadata)(target, propertyKey);
};

export const ExposedTypeApiProperty = (
  metadata?: ApiPropertyOptions,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions
) => (target: any, propertyKey: string) => {
  const typeFn =
    typeof metadata.type === 'function' ? metadata.type : () => metadata.type;
  ExposedType(typeFn as any, exposeOptions, typeOptions)(target, propertyKey);
  ApiProperty(metadata)(target, propertyKey);
};

export const ExposedApiPropertyOptional = (
  metadata?: ApiPropertyOptions,
  exposeOptions?: ExposeOptions
) => (target: any, propertyKey: string) => {
  Expose(exposeOptions)(target, propertyKey);
  ApiPropertyOptional(metadata)(target, propertyKey);
};

export const ExposedTypeApiPropertyOptional = (
  metadata?: ApiPropertyOptions,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions
) => (target: any, propertyKey: string) => {
  const typeFn =
    typeof metadata.type === 'function' ? metadata.type : () => metadata.type;
  ExposedType(typeFn as any, exposeOptions, typeOptions)(target, propertyKey);
  ApiPropertyOptional(metadata)(target, propertyKey);
};

export const ApiErrors = () => {
  function decorator(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    ApiNotFoundResponse({ type: ApiException, description: 'Not found' })(
      target,
      propertyKey,
      descriptor
    );
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' })(
      target,
      propertyKey,
      descriptor
    );
    ApiInternalServerErrorResponse({
      type: ApiException,
      description: 'Internal Server Error'
    })(target, propertyKey, descriptor);
  }

  return decorator as any;
};

export const ApiOperationId = (options?: ApiOperationOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerName = target.constructor.name;
    const operationId = `${controllerName.substr(
      0,
      controllerName.indexOf('Controller')
    )}_${propertyKey}`;

    ApiOperation({
      ...options,
      operationId
    })(target, propertyKey, descriptor);
  };
};
