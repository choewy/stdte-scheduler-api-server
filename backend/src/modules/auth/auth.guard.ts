import { ConfigKey, validateSocketAuth } from '@/core';
import { UserQuery } from '@/typeorm';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly config: JwtSignOptions;
  private readonly userQuery: UserQuery;

  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.config = this.configService.get(ConfigKey.Jwt);
    this.userQuery = new UserQuery(this.dataSource);
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return validateSocketAuth(
      ctx.switchToWs().getClient<Socket>(),
      this.userQuery,
      this.jwtService,
      this.config,
    );
  }
}
