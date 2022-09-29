import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Log } from '../typeorm/entities';

@Injectable()
export class LoggerRepository {
  private readonly target: Repository<Log>;

  constructor(private readonly dataSource: DataSource) {
    this.target = this.dataSource.getRepository(Log);
  }

  async insertOne(log: Log): Promise<void> {
    await this.target.insert(log);
  }
}
