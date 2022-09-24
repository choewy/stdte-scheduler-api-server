import { Role } from '../entities';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository extends BaseRepository {
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
}
