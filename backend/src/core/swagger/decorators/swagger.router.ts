import {
  applyDecorators,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';

const httpMethod = { Get, Post, Patch, Put, Delete };
const httpMethodKey = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] as const;

export type HttpMethod = typeof httpMethodKey[number];

export const SwaggerRouter = (
  method: HttpMethod,
  path?: string | string[],
  redirect?: string,
) => {
  const decorators = [
    httpMethod[method.slice(0, 1) + method.slice(1).toLowerCase()](path),
  ];

  redirect && decorators.push(Redirect(redirect));

  return applyDecorators(...decorators);
};
