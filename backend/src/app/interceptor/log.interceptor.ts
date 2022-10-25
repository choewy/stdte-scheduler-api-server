import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class LogInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const ws = ctx.switchToWs();
    const socket = ws.getClient<Socket>();
    socket['context'] = ctx.getClass().name;
    return next.handle();
  }
}
