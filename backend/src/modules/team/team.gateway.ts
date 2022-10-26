import { WSModuleGateway } from '@/core';
import { RedisService } from '@/core/redis';
import { UseGuards } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { AuthGuard } from '../auth';
import { TeamMessage } from './enums';
import { TeamService } from './team.service';

@WSModuleGateway()
export class TeamGateWay {
  constructor(
    private readonly redisService: RedisService,
    private readonly teamService: TeamService,
  ) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage(TeamMessage.All)
  async getTeams() {
    return [];
  }
}
