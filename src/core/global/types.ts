import { Request } from 'express';
import { User } from '../typeorm/entities';

export type RequestCtx = Request & {
  ctx: string;
  user: User;
};
