import {
  SwaggerAuth,
  SwaggerBody,
  SwaggerResponse,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { SignInDto, SignUpDto, TokenDto } from './dto';

export class AuthRouter {
  public static CheckAuth: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerAuth(),
      SwaggerSummary('인가 확인 API'),
    );
  };

  public static SignUp: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('회원가입 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: SignUpDto }),
      SwaggerResponse({ status: 200, type: TokenDto }),
      SwaggerResponse({ status: 409, description: '이미 등록된 계정' }),
    );
  };

  public static SignIn: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('로그인 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: SignInDto }),
      SwaggerResponse({ status: 200, type: TokenDto }),
      SwaggerResponse({ status: 401, description: '인증 실패' }),
    );
  };
}
