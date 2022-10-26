import { DataSource, EntityManager } from 'typeorm';
import { TeamAndUser } from './team_and_user.entity';

export class TeamAndUserQuery {
  constructor(
    public readonly base: DataSource | EntityManager,
    public readonly repository = base.getRepository(TeamAndUser),
  ) {}
}
