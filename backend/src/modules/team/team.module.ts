import { Module } from '@nestjs/common';
import { TeamGateWay } from './team.gateway';
import { TeamService } from './team.service';

@Module({
  providers: [TeamService, TeamGateWay],
})
export class TeamModule {}
