import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { Role, RolePolicy, User, Team } from '../entities';
import { EntityAttribute } from './interfaces';

@Injectable()
export class BaseRepository {
  constructor(protected dataSource: DataSource) {}

  attributes<T>(entity: EntityTarget<T>): EntityAttribute<T> {
    return {
      target: this.dataSource.getRepository(entity),
      instance: (arg: Partial<T> = {}) => {
        return Object.assign(entity, arg) as T;
      },
    };
  }

  protected get role() {
    return this.attributes(Role);
  }

  protected get rolePolicy() {
    return this.attributes(RolePolicy);
  }

  protected get user() {
    return this.attributes(User);
  }

  protected get team() {
    return this.attributes(Team);
  }
}
