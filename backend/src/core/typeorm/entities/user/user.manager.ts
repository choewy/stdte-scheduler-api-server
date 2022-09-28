import { IManager } from '../abstract.manager';
import { User } from './user.entity';

export class UserManager extends IManager<User> {
  get repository() {
    return this.dataSource.getRepository(User);
  }

  get queryBuilder() {
    return this.dataSource.createQueryBuilder(User, this.name);
  }
}
