import { applyDecorators } from '@nestjs/common';
import {
  SwaggerAuthGuard,
  SwaggerBody,
  SwaggerResponse,
  SwaggerRoleGuard,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import {
  CreateRoleDto,
  RoleRowDto,
  UpdateRoleDto,
  UpdateRoleMemberDto,
} from './dto';

export class RoleRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`admin(included)`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static readonly CommonGuards = () => {
    return applyDecorators(SwaggerAuthGuard(), SwaggerRoleGuard('admin'));
  };

  public static GetRoles: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 목록 조회 API'),
      SwaggerResponse({
        status: 200,
        type: [RoleRowDto],
      }),
    );
  };

  public static GetRole: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 조회 API'),
      SwaggerResponse({
        status: 200,
        type: RoleRowDto,
      }),
      SwaggerResponse({
        status: 404,
        description: '존재하지 않는 역할',
      }),
    );
  };

  public static CreateRole: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 생성 API'),
      SwaggerBody({
        formats: ['xwwwForm'],
        type: CreateRoleDto,
      }),
      SwaggerResponse({
        status: 201,
        type: null,
      }),
      SwaggerResponse({
        status: 409,
        description: '이미 존재하는 역할',
      }),
    );
  };

  public static UpdateRole: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 수정 API'),
      SwaggerBody({
        formats: ['xwwwForm'],
        type: UpdateRoleDto,
      }),
      SwaggerResponse({
        status: 200,
        type: null,
      }),
      SwaggerResponse({
        status: 404,
        description: '존재하지 않는 역할',
      }),
      SwaggerResponse({
        status: 409,
        description: '이미 사용 중인 역할 이름',
      }),
    );
  };

  public static UpdateRoleMember: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 멤버 수정 API'),
      SwaggerBody({
        formats: ['xwwwForm'],
        type: UpdateRoleMemberDto,
      }),
      SwaggerResponse({
        status: 200,
        type: null,
      }),
      SwaggerResponse({
        status: 404,
        description: '존재하지 않는 역할',
      }),
    );
  };

  public static DeleteRole: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('역할 삭제 API'),
      SwaggerResponse({
        status: 200,
        type: null,
      }),
      SwaggerResponse({
        status: 404,
        description: '존재하지 않는 역할',
      }),
    );
  };
}
