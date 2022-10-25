import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { RoleModule } from './role';

@Module({
  imports: [AuthModule, RoleModule],
})
export class Modules {}
