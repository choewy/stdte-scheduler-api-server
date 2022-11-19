import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  providers: [TeamRepository, TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
