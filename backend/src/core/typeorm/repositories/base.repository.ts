import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role, RolePolicy, User } from '../entities';

@Injectable()
export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  protected get role() {
    return this.dataSource.getRepository(Role);
  }

  protected get Role() {
    return Role;
  }

  protected get RolePolicy() {
    return RolePolicy;
  }

  protected get user() {
    return this.dataSource.getRepository(User);
  }

  protected get User() {
    return User;
  }
}
