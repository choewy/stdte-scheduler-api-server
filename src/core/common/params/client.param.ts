import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestCtx } from '@/core/global';
import { User } from '@/core/typeorm/entities';

export const Client = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext): User | Partial<User> => {
    const request = ctx.switchToHttp().getRequest<RequestCtx>();
    const user = request.user;
    return data ? (user?.[data] as Partial<User>) : user;
  },
);
