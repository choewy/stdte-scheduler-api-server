import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { RoleModule } from './role';
import { TeamModule } from './team';

@Module({
  imports: [AuthModule, RoleModule, TeamModule],
})
export class Modules {}
