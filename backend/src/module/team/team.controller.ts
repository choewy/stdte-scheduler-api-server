import { SwaggerController } from '@/core/swagger';
import { Body, Param, Query } from '@nestjs/common';
import { TeamRouter } from './team.router';
import { TeamService } from './team.service';
import {
  CreateTeamDto,
  TeamParamDto,
  TeamRowDto,
  UpdateTeamDto,
  UpdateTeamMemberDto,
  UpdateTeamMemberMethod,
  UpdateTeamMemberQueryDto,
} from './dto';

@SwaggerController({ path: 'teams', tag: '팀' })
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @TeamRouter.GetTeams({ method: 'GET' })
  async getTeams(): Promise<TeamRowDto[]> {
    return await this.service.getTeams();
  }

  @TeamRouter.GetTeam({ method: 'GET', path: ':id' })
  async getTeam(@Param() param: TeamParamDto): Promise<TeamRowDto> {
    return await this.service.getTeam(param);
  }

  @TeamRouter.CreateTeam({ method: 'POST' })
  async createTeam(@Body() body: CreateTeamDto): Promise<void> {
    return await this.service.createTeam(body);
  }

  @TeamRouter.UpdateTeam({ method: 'PATCH', path: ':id' })
  async updateTeam(
    @Param() param: TeamParamDto,
    body: UpdateTeamDto,
  ): Promise<void> {
    return await this.service.updateTeam(param, body);
  }

  @TeamRouter.UpdateTeamMembers({ method: 'PATCH', path: ':id/members' })
  async updateTeamMembers(
    @Param() param: TeamParamDto,
    @Query() query: UpdateTeamMemberQueryDto,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<void> {
    switch (query.method) {
      case UpdateTeamMemberMethod.Append:
        return await this.service.appendTeamMembers(param, body);

      case UpdateTeamMemberMethod.Remove:
        return await this.service.removeTeamMembers(param, body);
    }
  }

  @TeamRouter.DeleteTeam({ method: 'DELETE', path: ':id' })
  async deleteTeam(@Param() param: TeamParamDto): Promise<void> {
    return await this.service.deleteTeam(param);
  }
}
