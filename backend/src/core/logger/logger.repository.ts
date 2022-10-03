import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Log } from '../typeorm/entities';

@Injectable()
export class LoggerRepository {
  private readonly repository: Repository<Log>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Log);
  }

  async insertOne(log: Log): Promise<void> {
    await this.repository.insert(log);
  }
}
