import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role, User, Team } from '../entities';
import { IRoleRepository } from './i-role.repository';
import { ITeamRepository } from './i-team.repository';
import { IUserRepository } from './i-user.repository';

@Injectable()
/** @todo = delete */
export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  protected get targets() {
    return {
      user: this.dataSource.getRepository(User),
      role: this.dataSource.getRepository(Role),
      team: this.dataSource.getRepository(Team),
    };
  }

  protected get methods() {
    return {
      user: new IUserRepository(this.dataSource),
      role: new IRoleRepository(this.dataSource),
      team: new ITeamRepository(this.dataSource),
    };
  }
}
