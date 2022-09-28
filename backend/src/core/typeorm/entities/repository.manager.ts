import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleManager } from './role';
import { TaskManager } from './task';
import { TeamManager } from './team';
import { UserManager } from './user';

@Injectable()
export class IRepositoryManager {
  constructor(private readonly dataSource: DataSource) {}

  async transaction(runIntransaction: () => Promise<any>): Promise<void> {
    let error: unknown;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await runIntransaction();
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      throw error;
    }
  }

  protected get user() {
    return new UserManager(this.dataSource, 'user');
  }

  protected get role() {
    return new RoleManager(this.dataSource, 'role');
  }

  protected get team() {
    return new TeamManager(this.dataSource, 'team');
  }

  protected get task() {
    return new TaskManager(this.dataSource, 'task');
  }
}
