import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { ChatMessage } from './chat-message.entity';

export class ChatMessageManager extends IManager<ChatMessage> {
  get repository(): Repository<ChatMessage> {
    return this.dataSource.getRepository(ChatMessage);
  }

  get queryBuilder(): QueryBuilder<ChatMessage> {
    return this.dataSource.createQueryBuilder(ChatMessage, this.name);
  }
}
