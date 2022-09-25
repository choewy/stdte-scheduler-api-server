import {
  applyDecorators,
  ForbiddenException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BaseRepository } from '@/core/typeorm/repositories';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SwaggerResponse } from './swagger.response';
import { UserDto, ExceptionDto } from '@/appllication/dto';
import { JwtAuthService } from '@/core/jwt-auth';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthGuard extends BaseRepository implements CanActivate {
  constructor(
    dataSource: DataSource,
    private readonly jwtAuthService: JwtAuthService,
  ) {
    super(dataSource);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<boolean> {
    const bearer = request.headers.authorization;
    const token = (bearer || 'Bearer ').replace('Bearer ', '');
    const payload = this.jwtAuthService.verify('access', token);
    const user = await this.methods.user.findOne({
      id: payload['id'],
    });

    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증에 실패하였습니다.',
      });
    }

    if (!user.status) {
      throw new ForbiddenException({
        status: 403,
        message: '비활성 계정입니다.',
      });
    }

    delete user.password;

    request['user'] = new UserDto(user);
    return true;
  }
}

export const SwaggerAuth = () => {
  return applyDecorators(
    ApiBearerAuth('master'),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    SwaggerResponse({
      status: 401,
      type: ExceptionDto,
      description: '인가 실패',
    }),
  );
};
