import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(protected dataSource: DataSource) {
    super(dataSource);
  }
}
