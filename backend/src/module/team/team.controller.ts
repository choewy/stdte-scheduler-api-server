import { SwaggerController } from '@/core/swagger';
import { Body, Param, Query } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { TeamRouter } from './team.router';
import {
  CreateTeamDto,
  TeamParamDto,
  TeamRowDto,
  UpdateTeamDto,
  UpdateTeamMemberDto,
  UpdateTeamMemberMethod,
  UpdateTeamMemberQueryDto,
} from './dto';
import {
  appendTeamUsersEvent,
  createTeamEvent,
  deleteTeamEvent,
  getTeamEvent,
  getTeamsEvent,
  removeTeamUsersEvent,
  updateTeamEvent,
} from './events';

@SwaggerController({ path: 'teams', tag: '팀' })
export class TeamController {
  constructor(private readonly repository: TeamRepository) {}

  @TeamRouter.GetTeams({ method: 'GET' })
  async getTeams(): Promise<TeamRowDto[]> {
    return await getTeamsEvent(this.repository);
  }

  @TeamRouter.GetTeam({ method: 'GET', path: ':id' })
  async getTeam(@Param() param: TeamParamDto): Promise<TeamRowDto> {
    return await getTeamEvent(this.repository, param);
  }

  @TeamRouter.CreateTeam({ method: 'POST' })
  async createTeam(@Body() body: CreateTeamDto): Promise<void> {
    return await createTeamEvent(this.repository, body);
  }

  @TeamRouter.UpdateTeam({ method: 'PATCH', path: ':id' })
  async updateTeam(
    @Param() param: TeamParamDto,
    @Body() body: UpdateTeamDto,
  ): Promise<void> {
    return await updateTeamEvent(this.repository, param, body);
  }

  @TeamRouter.UpdateTeamMembers({ method: 'PATCH', path: ':id/members' })
  async updateTeamMembers(
    @Param() param: TeamParamDto,
    @Query() query: UpdateTeamMemberQueryDto,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<void> {
    switch (query.method) {
      case UpdateTeamMemberMethod.Append:
        return await appendTeamUsersEvent(this.repository, param, body);

      case UpdateTeamMemberMethod.Remove:
        return await removeTeamUsersEvent(this.repository, param, body);
    }
  }

  @TeamRouter.DeleteTeam({ method: 'DELETE', path: ':id' })
  async deleteTeam(@Param() param: TeamParamDto): Promise<void> {
    return await deleteTeamEvent(this.repository, param);
  }
}
