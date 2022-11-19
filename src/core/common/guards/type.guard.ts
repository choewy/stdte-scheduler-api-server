import { RequestCtx } from '@/core/global';
import { UserType } from '@/core/typeorm/entities';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetadataKey } from '../metadata';

@Injectable()
export class TypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const http = ctx.switchToHttp();
    const request = http.getRequest<RequestCtx>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const type = this.reflector.get<UserType>(
      MetadataKey.Type,
      ctx.getHandler(),
    );

    return user.type === type;
  }
}
