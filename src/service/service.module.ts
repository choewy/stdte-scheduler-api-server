import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { TeamModule } from './team';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, UserModule, TeamModule],
})
export class ServiceModule {}
