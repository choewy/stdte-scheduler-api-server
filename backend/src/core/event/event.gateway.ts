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
import { RedisService } from '../redis';
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
    private readonly redisService: RedisService,
  ) {
    this.config = this.configService.get(ConfigKey.Jwt);
  }

  async afterInit(server: Server) {
    for (const nsp of server._nsps) {
      await this.redisService.initSession(nsp[1].name);
    }

    return server;
  }

  async handleConnection(socket: Socket) {
    const nsp = socket.nsp.name;

    if (!validateConnection(socket, this.jwtService, this.config)) {
      return;
    }

    socket['context'] = 'Connected';
    this.loggerService.log(
      socket,
      await this.redisService.setSession(nsp, socket.id),
    );
  }

  async handleDisconnect(socket: Socket) {
    const nsp = socket.nsp.name;

    socket['context'] = 'Disconnected';
    this.loggerService.log(
      socket,
      await this.redisService.deleteSession(nsp, socket.id),
    );
  }
}
