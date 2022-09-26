import { UserDto } from '@/appllication/dto';
import {
  SwaggerAuthGuard,
  SwaggerBody,
  SwaggerResponse,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { applyDecorators } from '@nestjs/common';
import { SignInDto, SignUpDto, TokenDto } from './dto';

export class AuthRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`every`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static readonly CommonGuards = () => {
    return applyDecorators(SwaggerAuthGuard());
  };

  public static CheckAuth: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('인가 확인 API'),
      SwaggerResponse({ status: 200, type: UserDto }),
    );
  };

  public static SignUp: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonSummary('회원가입 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: SignUpDto }),
      SwaggerResponse({ status: 200, type: TokenDto }),
      SwaggerResponse({ status: 400, description: '이미 등록된 계정' }),
    );
  };

  public static SignIn: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonSummary('로그인 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: SignInDto }),
      SwaggerResponse({ status: 200, type: TokenDto }),
      SwaggerResponse({ status: 400, description: '인증 실패' }),
    );
  };
}
