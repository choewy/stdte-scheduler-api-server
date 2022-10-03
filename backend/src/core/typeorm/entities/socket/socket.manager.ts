import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Socket } from './socket.entity';

export class SocketManager extends IManager<Socket> {
  get repository(): Repository<Socket> {
    return this.dataSource.getRepository(Socket);
  }

  get queryBuilder(): QueryBuilder<Socket> {
    return this.dataSource.createQueryBuilder(Socket, this.name);
  }
}
