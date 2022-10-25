import { DataSource, EntityManager } from 'typeorm';
import { RoleAndUser } from './role_and_user.entity';

export class RoleAndUserQuery {
  constructor(
    public readonly base: DataSource | EntityManager,
    public readonly repository = base.getRepository(RoleAndUser),
  ) {}
}
