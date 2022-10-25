import { Entity, PrimaryColumn } from 'typeorm';
import { Team } from '..';
import { User } from '../user';

@Entity('team_and_user')
export class TeamAndUser {
  @PrimaryColumn()
  tid: number;
  team: Team;
  teams: Team[];

  @PrimaryColumn()
  uid: number;
  user: User;
  users: User[];
}
