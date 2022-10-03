import { CurrentUser } from '@/server/param';
import { UserDto } from '@/server/dto';
import { SwaggerController } from '@/core/swagger';
import { Body } from '@nestjs/common';
import { AuthRouter } from './auth.router';
import { SignInDto, SignUpDto, JwtTokenDto } from './dto';
import { AuthRepository } from './auth.repository';
import { JwtAuthService } from '@/core/jwt-auth';
import { signInEvent, signUpEvent } from './events';
import { User } from '@/core/typeorm/entities';

@SwaggerController({ path: '/auth', tag: '인증 및 인가' })
export class AuthController {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @AuthRouter.CheckAuth({ method: 'GET' })
  async checkAuth(@CurrentUser() user: User): Promise<UserDto> {
    return new UserDto(user);
  }

  @AuthRouter.SignUp({ method: 'POST', path: 'signup' })
  async signUp(@Body() body: SignUpDto): Promise<JwtTokenDto> {
    return await signUpEvent(this.repository, this.jwtAuthService, body);
  }

  @AuthRouter.SignIn({ method: 'POST', path: 'signin' })
  async signIn(@Body() body: SignInDto): Promise<JwtTokenDto> {
    return await signInEvent(this.repository, this.jwtAuthService, body);
  }
}
