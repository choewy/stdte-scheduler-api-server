import { NotificationDto } from '@/server/dto';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEmitEventType } from './enums';
import { AppSocketRepository } from './socket.repository';

@WebSocketGateway()
export class AppSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private server: Server;
  constructor(private readonly repository: AppSocketRepository) {}

  async afterInit(server: Server) {
    return server;
  }

  async handleConnection(client: Socket) {
    if (client.data.id) {
      const sockets = Array.from(this.server.sockets.sockets.values());

      sockets.forEach((socket) => {
        socket.data.id &&
          socket.emit(
            SocketEmitEventType.Notice,
            `${socket.data.nickname}(${socket.data.username})님이 로그인 하셨습니다.`,
          );
      });
    }
  }

  async handleDisconnect(client: Socket) {
    if (client.data.id) {
      await this.repository.deleteUserSocket(client.data.id, client.id);
    }
  }

  async notification(data: NotificationDto) {
    this.server.sockets.emit(SocketEmitEventType.Notice, data);
  }
}
