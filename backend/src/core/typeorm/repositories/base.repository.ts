import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Role,
  User,
  Team,
  UserManager,
  RoleManager,
  TeamManager,
} from '../entities';
import { IRoleRepository } from './i-role.repository';
import { ITeamRepository } from './i-team.repository';
import { IUserRepository } from './i-user.repository';

@Injectable()
/** @todo = delete */
export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  get user() {
    return new UserManager(this.dataSource, 'user');
  }

  get role() {
    return new RoleManager(this.dataSource, 'role');
  }

  get team() {
    return new TeamManager(this.dataSource, 'team');
  }

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

  protected async transaction(
    func: (...args: any[]) => Promise<any>,
  ): Promise<void> {
    let error: unknown;

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      await func();
      await qr.commitTransaction();
    } catch (e) {
      error = e;
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }

    if (error) {
      throw new InternalServerErrorException({
        status: 500,
        message: 'MySQL Transaction Error',
        data: error,
      });
    }
  }
}
