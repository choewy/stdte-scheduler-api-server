import { Role, Team, User } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository {
  async find(): Promise<User[]> {
    return await this.user.target.find({
      relations: {
        roles: {
          rolePolicy: true,
        },
        teams: true,
      },
      where: {
        roles: {
          rolePolicy: {
            master: false,
          },
        },
      },
    });
  }

  async findOne({
    id,
    username,
    nickname,
    email,
  }: Partial<User>): Promise<User> {
    return await this.user.target.findOne({
      relations: {
        roles: {
          rolePolicy: true,
        },
        teams: true,
      },
      where: {
        id,
        username,
        nickname,
        email,
        roles: [
          {
            rolePolicy: {
              master: false,
              admin: false,
            },
          },
        ],
      },
    });
  }

  async findDefaultRole(): Promise<Role[]> {
    return await this.role.target.find({
      relations: { rolePolicy: true },
      where: {
        rolePolicy: { default: true },
      },
    });
  }

  async findRoleByIds(roleIds: number[]): Promise<Role[]> {
    return await this.role.target.find({
      relations: { rolePolicy: true },
      where: { id: In(roleIds) },
    });
  }

  async findDefaultTeam(): Promise<Team[]> {
    return await this.team.target.find({
      where: { default: true },
    });
  }

  async findTeamByIds(teamIds: number[]): Promise<Team[]> {
    return await this.team.target.find({
      where: { id: In(teamIds) },
    });
  }

  async saveOne(user: Partial<User>): Promise<void> {
    await this.user.target.save(user);
  }

  async deleteOne(id: number): Promise<void> {
    await this.user.target.softDelete({ id });
  }
}
