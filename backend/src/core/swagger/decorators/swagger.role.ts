import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ExceptionDto, UserDto } from '@/server/dto';
import { BaseRepository } from '@/core/typeorm/repositories';
import { SwaggerResponse } from './swagger.response';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleType, RoleTypeKey } from '@/core/typeorm/entities';

@Injectable()
class RoleGuard extends BaseRepository implements CanActivate {
  constructor(dataSource: DataSource, private readonly reflector: Reflector) {
    super(dataSource);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();
    request['context'] = 'RoleGuard';
    return await this.validateRequest(ctx, request);
  }

  async validateRequest(
    ctx: ExecutionContext,
    request: Request,
  ): Promise<boolean> {
    const types = this.reflector.get<RoleTypeKey[]>('roles', ctx.getHandler());
    const user: UserDto = await request['user'];
    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증에 실패하였습니다.',
      });
    }

    let pass = false;
    for (const type of types) {
      if (user.roles.find((role) => role.type === RoleType[type])) {
        pass = true;
      }
    }

    if (!pass) {
      throw new ForbiddenException({
        status: 403,
        message: '접근 권한이 없습니다.',
      });
    }

    return pass;
  }
}

export const SwaggerRoleGuard = (...roles: RoleTypeKey[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(RoleGuard),
    SwaggerResponse({
      status: 403,
      type: ExceptionDto,
      description: '접근 권한 없음',
    }),
  );
};
