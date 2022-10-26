import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User, UserQuery } from '@/typeorm';
import { BcryptService, classConstructor, ConfigKey } from '@/core';
import { WsException } from '@nestjs/websockets';
import { SignInDto, SignUpDto } from './dto';
import { AuthTokenRvo } from './rvo';

@Injectable()
export class AuthService {
  private readonly config: JwtSignOptions;
  private readonly userQuery = new UserQuery(this.dataSource);

  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
  ) {
    this.config = this.configService.get(ConfigKey.Jwt);
  }

  async signUpUser({ name, email, password, confirmPassword }: SignUpDto) {
    if (password !== confirmPassword) {
      throw new WsException({
        status: 400,
        error: 'BadRequest',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    const user = await this.userQuery.selectUserOnlyQuery({ email }).getOne();

    if (user) {
      throw new WsException({
        status: 400,
        error: 'BadRequest',
        message: '이미 존재하는 메일 계정입니다.',
      });
    }

    const { uid } = await this.userQuery.repository.save(
      classConstructor(new User(), {
        name,
        email,
        password: this.bcryptService.hashPassword(password),
      }),
    );

    return classConstructor(new AuthTokenRvo(), {
      accessToken: this.jwtService.sign({ uid }, this.config),
      refreshToken: this.jwtService.sign({ uid }, this.config),
    });
  }

  async signInWithEmail({ email, password }: SignInDto) {
    const user = await this.userQuery.selectUserOnlyQuery({ email }).getOne();

    if (!user) {
      throw new WsException({
        status: 404,
        error: 'NotFound',
        message: '존재하지 않는 메일 계정입니다.',
      });
    }

    if (!this.bcryptService.verifyPassword(password, user.password)) {
      throw new WsException({
        status: 400,
        error: 'BadRequest',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    const { uid } = user;

    return classConstructor(new AuthTokenRvo(), {
      accessToken: this.jwtService.sign({ uid }, this.config),
      refreshToken: this.jwtService.sign({ uid }, this.config),
    });
  }
}
