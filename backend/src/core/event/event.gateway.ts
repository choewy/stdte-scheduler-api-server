import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigKey } from '../configs';
import { LoggerService } from '../logger';
import { connectMaps } from '../redis';
import { WSRootGateway } from './decorator';
import { validateConnection } from './helpers';

@WSRootGateway()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly config: JwtSignOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.config = this.configService.get(ConfigKey.Jwt);
  }

  afterInit(server: Server) {
    server._nsps.forEach((nsp) => {
      connectMaps[nsp.name] = [];
    });

    return server;
  }

  handleConnection(socket: Socket) {
    const nsp = socket.nsp.name;

    if (!validateConnection(socket, this.jwtService, this.config)) {
      return;
    }

    if (!connectMaps[nsp]) {
      connectMaps[nsp] = [];
    }

    connectMaps[nsp].push(socket.id);
    socket['context'] = 'Connected';

    this.loggerService.log(socket);
  }

  handleDisconnect(socket: Socket) {
    const nsp = socket.nsp.name;

    if (connectMaps[nsp]) {
      connectMaps[nsp] = connectMaps[nsp].filter(
        (id: string) => id !== socket.id,
      );

      socket['context'] = 'Disconnected';
    }
  }
}
