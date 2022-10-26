import { classConstructor } from '@/core';
import { Team } from '@/typeorm';
import { Expose } from 'class-transformer';

export class TeamUserRvo {
  @Expose()
  uid: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

export const teamUserConstructor = (team: Team) => {
  return team.members.map((user) =>
    classConstructor(new TeamUserRvo(), {
      uid: user.uid,
      name: user.name,
      email: user.email,
    }),
  );
};
