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
import { ExceptionDto, UserDto } from '@/appllication/dto';
import { BaseRepository } from '@/core/typeorm/repositories';
import { SwaggerResponse } from './swagger.response';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RolePolicyInterface } from '@/core/typeorm/entities';

export type RolePolicyKey = keyof RolePolicyInterface;

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
    const user: UserDto = await request['user'];

    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증에 실패하였습니다.',
      });
    }

    const role = this.reflector.get<RolePolicyKey>('role', ctx.getHandler());
    const only = this.reflector.get<boolean>('only', ctx.getHandler());
    const rolePolicy = user.roles.map(({ policy }) => policy);

    let pass = false;

    if (only) {
      pass = rolePolicy.find((policy) => !policy[role]) === undefined;
    } else {
      for (const policy of rolePolicy) {
        if (pass) {
          break;
        }

        pass = policy[role];
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

export const SwaggerRoleGuard = (role: RolePolicyKey, only?: boolean) => {
  return applyDecorators(
    SetMetadata('role', role),
    SetMetadata('only', only),
    UseGuards(RoleGuard),
    SwaggerResponse({
      status: 403,
      type: ExceptionDto,
      description: '접근 권한 없음',
    }),
  );
};
