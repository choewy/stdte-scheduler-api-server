import { Injectable } from '@nestjs/common';
import { Role, User } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  async findOneByUsername(username: string): Promise<User> {
    return await this.user.findOne({
      where: { username },
    });
  }

  async insertMaster(
    username: string,
    password: string,
    role: Role,
  ): Promise<void> {
    const user = new this.User();

    user.nickname = 'master';
    user.username = username;
    user.password = password;
    user.roles = [role];

    await this.user.save(user);
  }
}
