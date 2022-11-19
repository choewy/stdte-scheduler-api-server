import {
  applyDecorators,
  CanActivate,
  NestInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';

type ApiRequestOptions = {
  summary: string;
  description?: string;
  guards?: Array<Function | CanActivate>;
  interceptors?: Array<Function | NestInterceptor>;
  consume?: 'multipart' | 'x-www-form';
};

enum Consume {
  'x-www-form' = 'application/x-www-form-urlencoded',
  'multipart' = 'multipart/form-data',
}

export const ApiRequestType = ({
  summary,
  description,
  guards,
  interceptors,
  consume,
}: ApiRequestOptions) => {
  const decorators = [];

  decorators.push(ApiOperation({ summary, description }));

  if (guards && guards.length > 0) {
    decorators.push(UseGuards(...guards));
    decorators.push(ApiBearerAuth());
  }

  if (interceptors && interceptors.length > 0) {
    decorators.push(UseInterceptors(...interceptors));
  }

  if (consume) {
    decorators.push(ApiConsumes(Consume[consume]));
    decorators.push(ApiConsumes('application/json'));
  }

  return applyDecorators(...decorators);
};
