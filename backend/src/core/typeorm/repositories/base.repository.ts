import { DataSource } from 'typeorm';
import { Role, User } from '../entities';

export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  get user() {
    return this.dataSource.getRepository(User);
  }

  get role() {
    return this.dataSource.getRepository(Role);
  }
}
