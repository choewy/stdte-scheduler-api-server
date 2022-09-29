import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ConfigToken } from '../config';
import { sign, verify } from 'jsonwebtoken';
import { JwtType } from './enums';

@Injectable()
export class JwtAuthService {
  private readonly config: AuthConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<AuthConfig>(ConfigToken.Auth);
  }

  sign(type: JwtType, payload: object): string {
    switch (type) {
      case JwtType.AccesToken:
        const { access } = this.config;
        return sign(payload, access.secret, {
          audience: access.audience,
          subject: access.subject,
          issuer: access.issuer,
          expiresIn: access.expiresIn,
        });

      case JwtType.RefreshToken:
        const { refresh } = this.config;
        return sign(payload, refresh.secret, {
          audience: refresh.audience,
          subject: refresh.subject,
          issuer: refresh.issuer,
          expiresIn: refresh.expiresIn,
        });
    }
  }

  verify(type: JwtType, token: string) {
    try {
      switch (type) {
        case JwtType.AccesToken:
          const { access } = this.config;
          return verify(token, access.secret, {
            audience: access.audience,
            subject: access.subject,
            issuer: access.issuer,
          });

        case JwtType.RefreshToken:
          const { refresh } = this.config;
          return verify(token, refresh.secret, {
            audience: refresh.audience,
            subject: refresh.subject,
            issuer: refresh.issuer,
          });
      }
    } catch (e) {
      throw new UnauthorizedException({
        status: 401,
        message: '인증에 실패하였습니다.',
      });
    }
  }
}
