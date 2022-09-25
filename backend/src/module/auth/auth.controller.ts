import { CurrentUser } from '@/appllication/param';
import { UserDto } from '@/appllication/dto';
import { SwaggerController } from '@/core/swagger';
import { Body } from '@nestjs/common';
import { AuthRouter } from './auth.router';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, TokenDto } from './dto';

@SwaggerController({ path: '/auth', tag: '인증 및 인가' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @AuthRouter.CheckAuth({ method: 'GET' })
  async checkAuth(@CurrentUser() user: UserDto) {
    return user;
  }

  @AuthRouter.SignUp({ method: 'POST', path: 'signup' })
  async signUp(@Body() body: SignUpDto): Promise<TokenDto> {
    return await this.service.signUp(body);
  }

  @AuthRouter.SignIn({ method: 'POST', path: 'signin' })
  async signIn(@Body() body: SignInDto): Promise<TokenDto> {
    return await this.service.signIn(body);
  }
}
