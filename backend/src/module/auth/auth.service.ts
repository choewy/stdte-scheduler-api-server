import { User } from '@/core/typeorm/entities';
import { verifyPassword } from '@/core/bcrypt';
import { JwtAuthService } from '@/core/jwt-auth';
import { Injectable } from '@nestjs/common';
import { AuthException } from './auth.exception';
import { AuthRepository } from './auth.repository';
import { SignInDto, SignUpDto, TokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: AuthRepository,
    private readonly exception: AuthException,
  ) {}

  async signUp({
    confirmPassword,
    ...body
  }: Partial<User> & SignUpDto): Promise<TokenDto> {
    const { username, email, password } = body;

    if (verifyPassword(password, confirmPassword)) {
      throw this.exception.IncorrectPassword();
    }

    const check = await this.repository.findUser({ username });

    if (check) {
      throw this.exception.AlreadyExistUsername();
    }

    if (email) {
      const check = await this.repository.findUser({ email });
      if (check) {
        throw this.exception.AlreadyExistEmail();
      }
    }

    const user = await this.repository.createOne(body);
    const payload = { id: user.id };

    return new TokenDto({
      access: this.jwtAuthService.sign('access', payload),
      refresh: this.jwtAuthService.sign('refresh', payload),
    });
  }

  async signIn({ username, password }: SignInDto): Promise<TokenDto> {
    const user = await this.repository.findUser({ username });

    if (!user) this.exception.IncorrectAccount();
    if (!verifyPassword(password, user.password)) {
      this.exception.IncorrectAccount();
    }

    const payload = { id: user.id };
    return new TokenDto({
      access: this.jwtAuthService.sign('access', payload),
      refresh: this.jwtAuthService.sign('refresh', payload),
    });
  }
}
