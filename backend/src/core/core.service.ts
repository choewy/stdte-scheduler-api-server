import { Injectable } from '@nestjs/common';
import { RoleRepository } from './typeorm/repositories/role.repository';

@Injectable()
export class CoreService {
  constructor(private readonly roleRepositoy: RoleRepository) {}

  async initDefaultRole(): Promise<void> {
    const role = await this.roleRepositoy.findDefaultRole();
    if (!role) {
      await this.roleRepositoy.insertDefaultRole();
    }
  }

  async initMasterRole(): Promise<void> {
    const role = await this.roleRepositoy.findMasterRole();
    if (!role) {
      await this.roleRepositoy.insertMasterRole();
    }
  }
}
