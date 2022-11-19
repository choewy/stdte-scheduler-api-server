import { Request } from 'express';

export type RequestCtx = Request & {
  ctx: string;
};
