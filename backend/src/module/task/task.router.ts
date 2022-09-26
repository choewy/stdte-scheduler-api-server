import { SwaggerAuthGuard } from '@/core/swagger';
import { applyDecorators } from '@nestjs/common';

export class TaskRouter {
  private static readonly CommonGuards = () => {
    return applyDecorators(SwaggerAuthGuard());
  };
}
