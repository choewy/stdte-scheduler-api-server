import { Module } from '@nestjs/common';
import { RoleGateway } from './role.gateway';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService, RoleGateway],
})
export class RoleModule {}
