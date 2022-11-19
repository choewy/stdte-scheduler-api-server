import { BcryptService } from '@/core/utils';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly bcyptService: BcryptService,
    private readonly repository: UserRepository,
  ) {}
}
