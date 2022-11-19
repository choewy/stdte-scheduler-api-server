import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthRepository, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
