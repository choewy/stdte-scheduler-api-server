import { DateTime } from 'luxon';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeColumn } from '../columns';
import { DateTimeEntity } from './datetime.entity';
import { Role } from './role.entity';
import { Team } from './team.entity';

class Relation extends DateTimeEntity {
  @ManyToMany(() => Role, (e) => e.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Team, (e) => e.users)
  @JoinTable({ name: 'user_teams' })
  teams: Team[];
}

@Entity('user')
export class User extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: null })
  email: string;

  @Column({ default: true })
  status: boolean;

  @DateTimeColumn({ default: null })
  disabledAt: DateTime;
}
