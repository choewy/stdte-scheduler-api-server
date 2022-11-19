import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { InterceptorLogCtx } from '../ctx';

export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const logCtx = new InterceptorLogCtx(
      this.logger,
      ctx.switchToHttp(),
      ctx.getClass().name,
    );

    return next.handle().pipe(tap(() => logCtx.log));
  }
}
