import { AppExceptionRvo } from '@/app';
import {
  applyDecorators,
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SwaggerEndPointOptions } from './interfaces';

const httpMethodDecoratros = {
  GET: Get,
  POST: Post,
  PATCH: Patch,
  PUT: Put,
  DELETE: Delete,
  HEAD: Head,
  OPTIONS: Options,
};

export const SwaggerEndPoint = ({
  method,
  path,
  summary,
  description,
  authGuard,
  success,
  error,
  exclude,
}: SwaggerEndPointOptions<keyof typeof httpMethodDecoratros>) => {
  const decorators = [httpMethodDecoratros[method](path)];

  if (summary || description) {
    decorators.push(ApiOperation({ summary, description }));
  }

  if (authGuard) {
    decorators.push(ApiBearerAuth());
    decorators.push(UseGuards(/** AuthGuard */));
    decorators.push(
      ApiResponse({
        status: 401,
        type: AppExceptionRvo,
      }),
    );
  }

  if (success && success.length) {
    success.forEach((response) => {
      decorators.push(ApiResponse(response));
    });
  }

  if (error && error.length) {
    error.forEach((response) => {
      decorators.push(
        ApiResponse({
          ...response,
          type: AppExceptionRvo,
        }),
      );
    });
  }

  if (exclude) {
    decorators.push(ApiExcludeEndpoint(true));
  }

  return applyDecorators(...decorators);
};
