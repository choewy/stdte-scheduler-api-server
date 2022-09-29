import { JwtAuthService } from '@/core/jwt-auth';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';

@Module({
  providers: [JwtAuthService, RoleRepository],
  controllers: [RoleController],
})
export class RoleModule {}
