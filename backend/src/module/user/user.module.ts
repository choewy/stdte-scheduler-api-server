import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserException, UserService],
})
export class UserModule {}
