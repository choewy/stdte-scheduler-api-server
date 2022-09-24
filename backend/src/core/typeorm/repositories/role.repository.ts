import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role, RolePolicy } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository extends BaseRepository {
  constructor(protected dataSource: DataSource) {
    super(dataSource);
  }

  async findDefaultRole(): Promise<Role> {
    return await this.role.findOne({
      relations: { rolePolicy: true },
      where: {
        rolePolicy: {
          default: true,
        },
      },
    });
  }

  async findMasterRole(): Promise<Role> {
    return await this.role.findOne({
      relations: { rolePolicy: true },
      where: {
        rolePolicy: {
          master: true,
        },
      },
    });
  }

  async insertDefaultRole(): Promise<void> {
    const role = await this.role.save(
      Object.assign<Role, Partial<Role>>(new Role(), {
        name: '역할없음',
      }),
    );

    role.rolePolicy = Object.assign<RolePolicy, Partial<RolePolicy>>(
      new RolePolicy(),
      {
        roleId: role.id,
        default: true,
      },
    );

    await this.role.save(role);
  }

  async insertMasterRole(): Promise<void> {
    const role = await this.role.save(
      Object.assign<Role, Partial<Role>>(new Role(), {
        name: '마스터',
      }),
    );

    role.rolePolicy = Object.assign<RolePolicy, Partial<RolePolicy>>(
      new RolePolicy(),
      {
        roleId: role.id,
        master: true,
      },
    );

    await this.role.save(role);
  }
}
