import { User } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  private readonly userRepo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }

  async saveOne(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }
}
