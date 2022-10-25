import { Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { connectMaps } from '../redis';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: Logger) {}

  async log(socket: Socket) {
    const nsp = socket.nsp.name;
    const ip = socket.conn.remoteAddress;
    const ctxName = socket['context'];

    const message = `(nsp: ${nsp}, ${socket.id}, ${ip}) - ${JSON.stringify(
      connectMaps[nsp],
      null,
    )}`;

    this.logger.verbose(message, ctxName);
  }

  async warn(socket: Socket, exception: WsException) {
    const nsp = socket.nsp.name;
    const ip = socket.conn.remoteAddress;
    const ctxName = socket['context'];

    const message = `(nsp: ${nsp}, ${socket.id}, ${ip}) - ${JSON.stringify(
      exception.getError(),
      null,
    )}`;

    this.logger.warn(message, ctxName);
  }

  async error(socket: Socket, error: Error) {
    const nsp = socket.nsp.name;
    const ip = socket.conn.remoteAddress;
    const ctxName = socket['context'];

    const message = `(nsp: ${nsp}, ${socket.id}, ${ip}) - ${JSON.stringify(
      error,
      null,
    )}`;

    this.logger.error(message, ctxName, error.stack);
  }
}
