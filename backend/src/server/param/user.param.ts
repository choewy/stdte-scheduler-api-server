import { User } from '@/core/typeorm/entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator<string>(
  (data: keyof Partial<User>, ctx: ExecutionContext): User | Partial<User> => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req['user'] as User;
    return data ? (user?.[data] as Partial<User>) : user;
  },
);
