import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository {
  constructor(private readonly dataSource: DataSource) {}
}
