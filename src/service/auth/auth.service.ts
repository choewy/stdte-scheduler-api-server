import { ConfigKey, JwtConfig } from '@/core/config';
import { User } from '@/core/typeorm/entities';
import { BcryptService } from '@/core/utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import {
  SignInBody,
  SignResponse,
  SignUpBody,
  UpdatePasswordBody,
} from './dto';
import {
  AlreadyExistEmailException,
  CannotChangeCurrentPasswordException,
  IncorrectPasswordException,
} from './exceptions';

@Injectable()
export class AuthService {
  private readonly config: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly repository: AuthRepository,
  ) {
    this.config = this.configService.get<JwtConfig>(ConfigKey.Jwt);
  }

  async signUp(body: SignUpBody): Promise<SignResponse> {
    if (body.password !== body.confirmPassword) {
      throw new IncorrectPasswordException();
    }

    if (await this.repository.findByEmail(body.email)) {
      throw new AlreadyExistEmailException();
    }

    const user = await this.repository.saveOne(
      Object.assign(new User(), {
        email: body.email,
        name: body.name,
        password: this.bcryptService.hash(body.password),
      }),
    );

    const payload = { id: user.id };

    const res = new SignResponse();

    res.accessToken = this.jwtService.sign(payload, this.config);
    res.refreshToken = this.jwtService.sign(Object.assign(payload, res), {
      ...this.config,
      expiresIn: '14d',
    });

    return res;
  }

  async signIn(body: SignInBody): Promise<SignResponse> {
    const user = await this.repository.findByEmail(body.email);

    if (!user || !this.bcryptService.verify(body.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };

    const res = new SignResponse();

    res.accessToken = this.jwtService.sign(payload, this.config);
    res.refreshToken = this.jwtService.sign(Object.assign(payload, res), {
      ...this.config,
      expiresIn: '14d',
    });

    return res;
  }

  async updatePassword(user: User, body: UpdatePasswordBody): Promise<void> {
    if (!this.bcryptService.verify(body.password, user.password)) {
      throw new UnauthorizedException();
    }

    if (body.newPassword !== body.confirmNewPassword) {
      throw new IncorrectPasswordException();
    }

    if (body.password === body.newPassword) {
      throw new CannotChangeCurrentPasswordException();
    }

    user.password = this.bcryptService.hash(body.newPassword);

    await this.repository.saveOne(user);
  }
}
