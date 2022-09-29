import { Module } from '@nestjs/common';
import { JwtAuthService } from '@/core/jwt-auth';
import { TeamRepository } from './team.repository';
import { TeamController } from './team.controller';

@Module({
  providers: [JwtAuthService, TeamRepository],
  controllers: [TeamController],
})
export class TeamModule {}
