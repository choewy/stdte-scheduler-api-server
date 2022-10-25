import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const extractResponseContextName = (
  ctx: ExecutionContext,
  request: Request,
) => {
  request['context'] = ctx.getClass().name;
};

export const responseContextName = (request: Request) => {
  return request['context'] || 'AuthGuard';
};
