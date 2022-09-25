import {
  SwaggerAuthGuard,
  SwaggerRoleGuard,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { applyDecorators } from '@nestjs/common';

export class TeamRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`admin(included)`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static readonly CommonGuards = () => {
    return applyDecorators(SwaggerAuthGuard(), SwaggerRoleGuard('admin'));
  };

  public static GetTeams: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 목록 조회 API'),
    );
  };

  public static GetTeam: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 조회 API'),
    );
  };

  public static CreateTeam: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 생성 API'),
    );
  };

  public static UpdateTeam: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 수정 API'),
    );
  };

  public static UpdateTeamMembers: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 멤버 수정 API'),
    );
  };

  public static DeleteTeam: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonGuards(),
      this.CommonSummary('팀 삭제 API'),
    );
  };
}
