import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { ChatRoom } from './chat-room.entity';

export class ChatRoomManager extends IManager<ChatRoom> {
  get repository(): Repository<ChatRoom> {
    return this.dataSource.getRepository(ChatRoom);
  }

  get queryBuilder(): QueryBuilder<ChatRoom> {
    return this.dataSource.createQueryBuilder(ChatRoom, this.name);
  }
}
