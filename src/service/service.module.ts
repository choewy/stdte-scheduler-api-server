import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { TaskModule } from './task';
import { TeamModule } from './team';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, UserModule, TeamModule, TaskModule],
})
export class ServiceModule {}
