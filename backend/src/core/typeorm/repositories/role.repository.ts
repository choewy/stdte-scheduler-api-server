import { Role } from '../entities';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository extends BaseRepository {
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
    const role = new this.Role();

    role.name = '역할없음';
    role.rolePolicy = new this.RolePolicy();
    role.rolePolicy.roleId = 1;
    role.rolePolicy.default = true;

    await this.role.save(role);
  }

  async insertMasterRole(): Promise<void> {
    const role = new this.Role();

    role.name = '마스터';
    role.rolePolicy = new this.RolePolicy();
    role.rolePolicy.roleId = 2;
    role.rolePolicy.master = true;

    await this.role.save(role);
  }
}
