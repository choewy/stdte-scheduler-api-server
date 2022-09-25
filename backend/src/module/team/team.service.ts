import { Injectable } from '@nestjs/common';
import { In, Not } from 'typeorm';
import { TeamException } from './team.exception';
import { TeamRepository } from './team.repository';
import {
  CreateTeamDto,
  TeamParamDto,
  TeamRowDto,
  UpdateTeamDto,
  UpdateTeamMemberDto,
} from './dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly repository: TeamRepository,
    private readonly exception: TeamException,
  ) {}

  async getTeams(): Promise<TeamRowDto[]> {
    const teams = await this.repository.findMany();
    const users = await this.repository.findUsers({
      teams: { id: In(teams.map(({ id }) => id)) },
    });

    return teams.map((team) => {
      const members = users.filter((user) => {
        const teamIds = user.teams.map(({ id }) => id);
        return teamIds.includes(team.id);
      });

      return new TeamRowDto(team, members);
    });
  }

  async getTeam({ id }: TeamParamDto): Promise<TeamRowDto> {
    const team = await this.repository.findOne({ id });

    if (!team) {
      this.exception.NotFoundTeam();
    }

    const users = await this.repository.findUsers({
      teams: { id: In([team.id]) },
    });

    return new TeamRowDto(team, users);
  }

  async createTeam(body: CreateTeamDto): Promise<void> {
    const { name } = body;
    const check = await this.repository.findOne({ name });

    if (check) {
      this.exception.AlreadyExistTeam();
    }

    await this.repository.saveOne(body);
  }

  async updateTeam({ id }: TeamParamDto, body: UpdateTeamDto): Promise<void> {
    const team = await this.repository.findOne({ id, default: false });

    if (!team) {
      this.exception.NotFoundTeam();
    }

    const { name } = body;
    const check = await this.repository.findOne({
      id: Not(id),
      name,
    });

    if (check) {
      this.exception.AlreadyExistTeamName();
    }

    await this.repository.saveOne(Object.assign(team, body));
  }

  async appendTeamMembers(
    { id }: TeamParamDto,
    { userIds }: UpdateTeamMemberDto,
  ): Promise<void> {
    const team = await this.repository.findOne({
      id,
      default: false,
    });

    if (!team) {
      this.exception.NotFoundTeam();
    }

    const users = await this.repository.findUsers({
      id: In(userIds),
    });

    users.forEach((user) => {
      user.teams = user.teams.filter((team) => !team.default).concat(team);
    });

    await this.repository.saveUsers(users);
  }

  async removeTeamMembers(
    { id }: TeamParamDto,
    { userIds }: UpdateTeamMemberDto,
  ): Promise<void> {
    const team = await this.repository.findOne({
      id,
      default: false,
    });

    if (!team) {
      this.exception.NotFoundTeam();
    }

    const defaultTeam = await this.repository.findOne({
      default: true,
    });

    const users = await this.repository.findUsers({
      id: In(userIds),
    });

    users.forEach((user) => {
      user.teams = user.teams.filter(({ id }) => id !== team.id);
      !user.teams.length && user.teams.push(defaultTeam);
    });

    await this.repository.saveUsers(users);
  }

  async deleteTeam({ id }: TeamParamDto): Promise<void> {
    const team = await this.repository.findOne({
      id,
      default: false,
    });

    if (!team) {
      this.exception.NotFoundTeam();
    }

    await this.repository.deleteOne(team);
  }
}
