import { Injectable } from '@nestjs/common';
import { Role, Team, User } from './typeorm';
import { BaseRepository } from './typeorm/repositories/base.repository';

@Injectable()
export class CoreRepository extends BaseRepository {
  async findDefaultRole(): Promise<Role> {
    return await this.role.target.findOne({
      relations: { rolePolicy: true },
      where: {
        rolePolicy: {
          default: true,
        },
      },
    });
  }

  async findMasterRole(): Promise<Role> {
    return await this.role.target.findOne({
      relations: { rolePolicy: true },
      where: {
        rolePolicy: {
          master: true,
        },
      },
    });
  }

  async findDefaultTeam(): Promise<Team> {
    return await this.team.target.findOne({
      where: { id: 1 },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.user.target.findOne({
      where: { username },
    });
  }

  async insertMaster(
    username: string,
    password: string,
    role: Role,
  ): Promise<void> {
    await this.user.target.save(
      this.user.instance({
        nickname: 'master',
        username,
        password,
        roles: [role],
      }),
    );
  }

  async insertDefaultRole(): Promise<void> {
    await this.role.target.save(
      this.role.instance({
        name: '역할없음',
        rolePolicy: this.rolePolicy.instance({
          roleId: 1,
          default: true,
        }),
      }),
    );
  }

  async insertMasterRole(): Promise<void> {
    await this.role.target.save(
      this.role.instance({
        name: '마스터',
        rolePolicy: this.rolePolicy.instance({
          roleId: 2,
          master: true,
        }),
      }),
    );
  }

  async insertDefaultTeam(): Promise<void> {
    await this.team.target.save(
      this.team.instance({
        name: '소속없음',
        default: true,
      }),
    );
  }
}
