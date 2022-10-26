import { classConstructor } from '@/core';
import { Team } from '@/typeorm';
import { Expose } from 'class-transformer';
import { teamUserConstructor, TeamUserRvo } from './team-user.rvo';

export class TeamRvo {
  @Expose()
  tid: number;

  @Expose()
  name: string;

  @Expose()
  members: TeamUserRvo[];
}

export const teamRvoConstructor = (row: Team) => {
  return classConstructor(new TeamRvo(), {
    tid: row.tid,
    name: row.name,
    members: teamUserConstructor(row),
  });
};
