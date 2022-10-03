import { SocketEmitEventType, SocketSubEvent } from '@/socket';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from './chat.repository';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly repository: ChatRepository) {}

  @SubscribeMessage(SocketSubEvent.MessageRooms)
  async getMessageRooms(@ConnectedSocket() client: Socket) {
    console.log(client.data);
    const rooms = await this.repository.findChatRoomsByUserId(client.data.id);
    client.emit(SocketEmitEventType.MessageRooms, {
      count: rooms.length,
      rows: rooms,
    });
  }
}
