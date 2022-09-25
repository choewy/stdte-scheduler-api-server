import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<Request>();
    request['className'] = ctx.getClass().name || 'Application';

    return next.handle().pipe(
      tap(() => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const { ip, method, url, params, query } = request;
        const message = `(${ip}) ${method} ${url}`;
        this.logger.log(message, request['className'], params, query);
      }),
    );
  }
}
