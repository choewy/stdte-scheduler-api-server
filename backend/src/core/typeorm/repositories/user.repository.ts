import { Injectable } from '@nestjs/common';
import { Role, User } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  async findOneByUsername(username: string): Promise<User> {
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
}
