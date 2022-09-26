import {
  applyDecorators,
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
class AuthGuard extends BaseRepository implements CanActivate {
  constructor(
    dataSource: DataSource,
    private readonly jwtAuthService: JwtAuthService,
  ) {
    super(dataSource);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<Request>();
    request['context'] = 'AuthGuard';
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

    delete user.password;

    request['user'] = new UserDto(user);
    return true;
  }
}

export const SwaggerAuthGuard = () => {
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
