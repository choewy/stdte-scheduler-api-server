import { JwtAuthService } from '@/core/jwt-auth';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [JwtAuthService, UserRepository],
})
export class UserModule {}
