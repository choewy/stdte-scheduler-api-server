import { DataSource } from 'typeorm';
import { classConstructor } from '@/core';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Team, TeamQuery, UserQuery, TeamAndUserQuery } from '@/typeorm';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { TeamRvo, teamRvoConstructor, TeamUserRvo } from './rvo';

@Injectable()
export class TeamService {
  private readonly teamQuery: TeamQuery;
  private readonly userQuery: UserQuery;
  private readonly teamAndUserQuery: TeamAndUserQuery;

  constructor(private readonly dataSource: DataSource) {
    this.teamQuery = new TeamQuery(this.dataSource);
    this.userQuery = new UserQuery(this.dataSource);
    this.teamAndUserQuery = new TeamAndUserQuery(this.dataSource);
  }

  async getTeams(): Promise<TeamRvo[]> {
    const rows = await this.teamQuery.selectTeamQuery().getMany();
    return rows.map((row) => teamRvoConstructor(row));
  }

  async createTeam(body: CreateTeamDto): Promise<TeamRvo> {
    const team = await this.teamQuery
      .selectTeamQuery({ name: body.name })
      .getOne();

    if (team) {
      throw new WsException({
        status: 400,
        error: 'Conflict',
        message: '이미 존재하는 팀명은 사용할 수 없습니다.',
      });
    }

    const { identifiers } = await this.teamQuery.repository.insert(
      classConstructor(new Team(), { name: body.name }),
    );

    return teamRvoConstructor(
      await this.teamQuery
        .selectTeamQuery({ tid: identifiers[0].tid })
        .getOne(),
    );
  }

  async updateTeam({ tid, ...body }: UpdateTeamDto): Promise<TeamRvo> {
    const team = await this.teamQuery.selectTeamQuery({ tid }).getOne();

    if (!team) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 팀입니다.',
      });
    }

    if (body.name) {
      const team = await this.teamQuery
        .selectTeamQuery({ name: body.name })
        .getOne();

      if (team && team.tid !== tid) {
        throw new WsException({
          status: 400,
          error: 'Conflict',
          message: '이미 존재하는 팀명은 사용할 수 없습니다.',
        });
      }
    }

    await this.teamQuery.repository.update({ tid }, body);

    return teamRvoConstructor(
      await this.teamQuery.selectTeamQuery({ tid }).getOne(),
    );
  }

  async deleteTeam(tid: number): Promise<void> {
    let exception: WsException;

    await this.dataSource.transaction(async (em) => {
      const teamQuery = new TeamQuery(em);
      const teamAndUserQuery = new TeamAndUserQuery(em);

      const team = await teamQuery.selectTeamQuery({ tid }, true).getOne();

      if (!team) {
        exception = new WsException({
          status: 400,
          error: 'NotFound',
          message: '존재하지 않는 팀입니다.',
        });

        return;
      }

      await teamQuery.repository.delete({ tid });
      await teamAndUserQuery.repository.delete({ tid });
    });

    if (exception) {
      throw exception;
    }
  }

  async searchUser(tid: number, keyword: string): Promise<TeamUserRvo[]> {
    if (!keyword) {
      return [];
    }

    const rows = await this.userQuery.selectUserByKeywordNotInTeamExecute(
      tid,
      keyword,
    );

    return rows.map((row) => classConstructor(new TeamUserRvo(), row));
  }

  async appendMember(tid: number, uid: number): Promise<TeamRvo> {
    await this.teamAndUserQuery.repository.insert({ tid, uid });
    const team = await this.teamQuery.selectTeamQuery({ tid }).getOne();

    if (!team) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 팀입니다.',
      });
    }

    return teamRvoConstructor(team);
  }

  async removeMember(tid: number, uid: number): Promise<TeamRvo> {
    await this.teamAndUserQuery.repository.delete({ tid, uid });
    const team = await this.teamQuery.selectTeamQuery({ tid }).getOne();

    if (!team) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 팀입니다.',
      });
    }

    return teamRvoConstructor(team);
  }
}
