import { SocketEmitEventType, SocketSubEvent } from '@/socket';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthRepository } from './auth.repository';
import { SocketUserDataDto } from './dto';

@WebSocketGateway()
export class AuthGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly repository: AuthRepository) {}

  @SubscribeMessage(SocketSubEvent.Sign)
  async welcome(
    @MessageBody() user: SocketUserDataDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.data = user;

    const socket = await this.repository.findUserSocket(user.id);

    if (socket) {
      return await this.repository.updateUserSocket(
        user.id,
        socket.socketId,
        client.id,
      );
    }

    await this.repository.insertSocket(user.id, client.id);
    client.emit(SocketEmitEventType.Notice, {
      message: `${user.nickname}(${user.username})님 환영합니다.`,
    });
  }

  @SubscribeMessage(SocketSubEvent.SignOut)
  async signout(@ConnectedSocket() client: Socket) {
    await this.repository.deleteUserSockets(client.data.id);
  }
}
