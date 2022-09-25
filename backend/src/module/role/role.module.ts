import { JwtAuthService } from '@/core/jwt-auth';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleException } from './role.exception';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  providers: [JwtAuthService, RoleRepository, RoleException, RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
