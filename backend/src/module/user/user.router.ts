import {
  SwaggerBody,
  SwaggerResponse,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

export class UserRouter {
  public static GetUsers: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('사용자 목록 조회 API'),
      SwaggerResponse({ status: 200, type: [UserDto] }),
    );
  };

  public static GetUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('사용자 조회 API'),
      SwaggerResponse({ status: 200, type: UserDto }),
      SwaggerResponse({ status: 404, description: '존재하지 않는 사용자' }),
    );
  };

  public static CreateUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('사용자 생성 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: CreateUserDto }),
      SwaggerResponse({ status: 201, type: null }),
      SwaggerResponse({
        status: 409,
        description: '이미 사용 중인 아이디',
      }),
    );
  };

  public static UpdateUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('사용자 수정 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: UpdateUserDto }),
      SwaggerResponse({ status: 200, type: null }),
      SwaggerResponse({
        status: 404,
        description: '존재하지 않는 사용자',
      }),
      SwaggerResponse({
        status: 409,
        description: '이미 사용 중인 아이디 또는 이메일',
      }),
    );
  };

  public static DeleteUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      SwaggerSummary('사용자 삭제 API'),
      SwaggerResponse({ status: 200, type: null }),
      SwaggerResponse({ status: 404, description: '존재하지 않는 사용자' }),
    );
  };
}
