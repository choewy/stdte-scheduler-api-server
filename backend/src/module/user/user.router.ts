import {
  SwaggerAuthGuard,
  SwaggerBody,
  SwaggerResponse,
  SwaggerRoleGuard,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserRowDto } from './dto';

export class UserRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`admin(included)`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static readonly CommonGuards = () => {
    return applyDecorators(
      SwaggerAuthGuard(),
      SwaggerRoleGuard('Master', 'Admin'),
    );
  };

  public static GetUsers: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('사용자 목록 조회 API'),
      SwaggerResponse({
        status: 200,
        type: [UserRowDto],
      }),
    );
  };

  public static GetUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('사용자 조회 API'),
      SwaggerResponse({
        status: 200,
        type: UserRowDto,
      }),
      SwaggerResponse({
        status: 404,
        description: '사용자 조회 실패',
      }),
    );
  };

  public static CreateUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('사용자 생성 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: CreateUserDto }),
      SwaggerResponse({ status: 201, type: null }),
      SwaggerResponse({
        status: 400,
        description: '이미 사용 중인 아이디',
      }),
    );
  };

  public static UpdateUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('사용자 수정 API'),
      SwaggerBody({ formats: ['xwwwForm'], type: UpdateUserDto }),
      SwaggerResponse({ status: 200, type: null }),
      SwaggerResponse({
        status: 400,
        description: '이미 사용 중인 이메일',
      }),
      SwaggerResponse({
        status: 404,
        description: '사용자 조회 실패',
      }),
    );
  };

  public static DeleteUser: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('사용자 삭제 API'),
      SwaggerResponse({
        status: 200,
        type: null,
      }),
      SwaggerResponse({
        status: 404,
        description: '사용자 조회 실패',
      }),
    );
  };
}
