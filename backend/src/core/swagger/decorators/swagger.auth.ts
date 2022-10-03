import {
  applyDecorators,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SwaggerResponse } from './swagger.response';
import { UserDto, ExceptionDto } from '@/server/dto';
import { JwtAuthService, JwtType } from '@/core/jwt-auth';
import { DataSource } from 'typeorm';
import { IRepositoryManager } from '@/core/typeorm/entities';

@Injectable()
class AuthGuard extends IRepositoryManager implements CanActivate {
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
    const payload = this.jwtAuthService.verify(JwtType.AccesToken, token);

    const user = await this.user
      .selectAllRelationQuery({ id: payload['id'] })
      .getOne();

    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증에 실패하였습니다.',
      });
    }

    request['user'] = new UserDto(user);

    return true;
  }
}

export const SwaggerAuthGuard = () => {
  return applyDecorators(
    ApiBearerAuth('masterAuth'),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    SwaggerResponse({
      status: 401,
      type: ExceptionDto,
      description: '인가 실패',
    }),
  );
};
