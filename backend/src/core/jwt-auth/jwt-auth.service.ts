import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ConfigToken } from '../config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
  private readonly config: AuthConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<AuthConfig>(ConfigToken.Auth);
  }

  sign(type: keyof AuthConfig, payload: object): string {
    const config = this.config[type];
    return sign(payload, config.secret, {
      audience: config.audience,
      subject: config.subject,
      issuer: config.issuer,
      expiresIn: config.expiresIn,
    });
  }

  verify(type: keyof AuthConfig, token: string) {
    const config = this.config[type];
    return verify(token, config.secret, {
      audience: config.audience,
      subject: config.subject,
      issuer: config.issuer,
    });
  }
}
