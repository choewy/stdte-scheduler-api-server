import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: null })
  email: string;
}
