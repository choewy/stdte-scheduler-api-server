import { Socket } from 'socket.io';
import { Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { LoggerService } from '@/core';
import { ArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  async catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host);
    const ws = host.switchToWs();
    const socket = ws.getClient<Socket>();

    if (exception instanceof WsException) {
      await this.loggerService.warn(socket, exception);
    } else {
      await this.loggerService.error(socket, exception);
    }
  }
}
