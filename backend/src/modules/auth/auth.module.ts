import { Module } from '@nestjs/common';
import { AuthGateway } from './auth.gateway';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthGateway],
})
export class AuthModule {}
