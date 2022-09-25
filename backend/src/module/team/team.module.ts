import { Module } from '@nestjs/common';
import { JwtAuthService } from '@/core/jwt-auth';
import { TeamRepository } from './team.repository';
import { TeamException } from './team.exception';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  providers: [JwtAuthService, TeamRepository, TeamException, TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
