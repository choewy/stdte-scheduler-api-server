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
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { NotificationDto } from './dto';

export class ServerRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`amdin`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static readonly CommonGuards = () => {
    return applyDecorators(
      SwaggerAuthGuard(),
      SwaggerRoleGuard('Master', 'Admin'),
    );
  };

  public static SwaggerDocs: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      ApiExcludeEndpoint(true),
      SwaggerResponse({
        status: 304,
        type: null,
      }),
    );
  };

  public static Notification: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonSummary('시스템 공지 API'),
      this.CommonGuards(),
      SwaggerBody({ formats: ['xwwwForm'], type: NotificationDto }),
      SwaggerResponse({
        status: 200,
        type: null,
      }),
    );
  };
}
