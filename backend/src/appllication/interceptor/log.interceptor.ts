import { LoggerService } from '@/core/logger';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest<Request>();
    request['context'] = ctx.getClass().name;
    return next.handle().pipe(
      tap(async () => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const response = ctx.switchToHttp().getResponse<Response>();
        await this.loggerService.verbose(request, response);
      }),
    );
  }
}
