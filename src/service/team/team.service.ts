import { Team } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CreateTeamBody,
  TeamDetailResponse,
  TeamListResponse,
  TeamMemberMethod,
  TeamResponse,
  TeamUserResponse,
  UpdateTeambody,
} from './dto';
import {
  AlreadyExistTeamNameException,
  NotFoundTeamException,
  NotFoundUserException,
} from './exceptions';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly repository: TeamRepository) {}

  async getTeamList(): Promise<TeamListResponse> {
    const [count, rows] = await this.repository.findAsList();

    const res = new TeamListResponse();

    res.count = count;
    res.rows = plainToInstance(
      TeamResponse,
      rows.map(({ id, name, users }) => ({
        id,
        name,
        count: users.length,
      })),
    );

    return res;
  }

  async getTeamDetail(teamId: number): Promise<TeamDetailResponse> {
    const row = await this.repository.findById(teamId);

    if (!row) {
      throw new NotFoundTeamException();
    }

    const { id, name, users } = row;

    return plainToInstance(TeamDetailResponse, {
      id,
      name,
      users: plainToInstance(
        TeamUserResponse,
        users.map(({ id, type, name, email }) => ({
          id,
          type,
          name,
          email,
        })),
      ),
    });
  }

  async createTeam(body: CreateTeamBody): Promise<void> {
    if (await this.repository.findByName(body.name)) {
      throw new AlreadyExistTeamNameException();
    }

    await this.repository.saveOne(
      Object.assign(new Team(), {
        name: body.name,
      }),
    );
  }

  async updateTeam(teamId: number, body: UpdateTeambody): Promise<void> {
    const team = await this.repository.findById(teamId);

    if (!team) {
      throw new NotFoundTeamException();
    }

    if (await this.repository.findByNameOmitId(teamId, body.name)) {
      throw new AlreadyExistTeamNameException();
    }

    if (body.name) {
      team.name = body.name;
    }

    await this.repository.saveOne(team);
  }

  async updateTeamMember(
    teamId: number,
    method: TeamMemberMethod,
    userId: number,
  ): Promise<void> {
    const [team, user] = await Promise.all([
      this.repository.findById(teamId),
      this.repository.findUserById(userId),
    ]);

    if (!team) {
      throw new NotFoundTeamException();
    }

    if (!user) {
      throw new NotFoundUserException();
    }

    switch (method) {
      case TeamMemberMethod.Append:
        if (team.users.map(({ id }) => id).includes(user.id)) {
          return;
        }

        return this.repository.insertTeamAndUser(teamId, userId);

      case TeamMemberMethod.Remove:
        if (!team.users.map(({ id }) => id).includes(user.id)) {
          return;
        }

        return this.repository.deleteTeamAndUser(teamId, userId);
    }
  }

  async deleteTeam(teamId: number): Promise<void> {
    const team = await this.repository.findById(teamId);

    if (!team) {
      throw new NotFoundTeamException();
    }

    return this.repository.deleteById(teamId);
  }
}
