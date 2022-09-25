import { Role, User } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository {
  async findMany(where: FindOptionsWhere<Role> = {}): Promise<Role[]> {
    return await this.methods.role.findMany(where);
  }

  async findOne(where: FindOptionsWhere<Role>): Promise<Role> {
    return await this.methods.role.findOne(where);
  }

  async findUsers(where: FindOptionsWhere<User>): Promise<User[]> {
    return await this.methods.user.findMany(where);
  }

  async createOne(data: Partial<Role>): Promise<void> {
    return await this.transaction(async () => {
      const role = await this.targets.role.save(data);
      await this.targets.role.save(
        Object.assign(role, {
          rolePolicy: {
            roleId: role.id,
            manager: true,
            member: true,
          },
        }),
      );
    });
  }

  async saveOne(role: Partial<Role>): Promise<void> {
    await this.targets.role.save(role);
  }

  async saveUsers(users: User[]): Promise<void> {
    await this.targets.user.save(users);
  }

  async deleteOne({ id }: Role): Promise<void> {
    this.targets.role.softDelete({ id });
  }
}
