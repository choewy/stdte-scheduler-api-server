import { JwtAuthService } from '@/core/jwt-auth';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthException } from './auth.exception';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  providers: [JwtAuthService, AuthRepository, AuthException, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
