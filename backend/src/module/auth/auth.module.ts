import { Module } from '@nestjs/common';
import { JwtAuthService } from '@/core/jwt-auth';
import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';
import { AuthRepository } from './auth.repository';

@Module({
  providers: [JwtAuthService, AuthRepository, AuthGateway],
  controllers: [AuthController],
})
export class AuthModule {}
