import { Team, User } from '@/core/typeorm/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamAndUser {
  @PrimaryColumn({ primary: false })
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  teamId: number;
  team: Team;
  teams: Team[];

  @PrimaryColumn({ primary: false })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: number;
  user: User;
  users: User[];
}
