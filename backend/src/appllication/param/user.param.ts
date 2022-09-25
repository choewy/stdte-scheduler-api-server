import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from '../dto';

export const CurrentUser = createParamDecorator<string>(
  (
    data: keyof Partial<UserDto>,
    ctx: ExecutionContext,
  ): UserDto | Partial<UserDto> => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req['user'] as UserDto;
    return data ? (user?.[data] as Partial<UserDto>) : user;
  },
);
