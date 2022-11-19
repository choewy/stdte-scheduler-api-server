import { ConfigKey, JwtConfig } from '@/core/config';
import { RequestCtx } from '@/core/global';
import { User } from '@/core/typeorm/entities';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly config: JwtConfig;
  private readonly userRepo: Repository<User>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    this.config = this.configService.get<JwtConfig>(ConfigKey.Jwt);
    this.userRepo = this.dataSource.getRepository(User);
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const http = ctx.switchToHttp();
    const request = http.getRequest<RequestCtx>();

    const bearer = (request.headers.authorization || 'Bearer ').replace(
      'Bearer ',
      '',
    );

    try {
      const { id } = this.jwtService.verify(bearer, this.config);
      request.user = await this.userRepo.findOneBy({ id });
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    return true;
  }
}
