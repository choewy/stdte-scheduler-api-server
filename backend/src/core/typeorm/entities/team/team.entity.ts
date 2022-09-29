import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeEntity } from '../datetime.entity';
import { TeamSetting } from '../team-setting';
import { Task } from '../task';
import { User } from '../user';

export enum TeamStatus {
  Global = 'global',
  Private = 'private',
  Default = 'default',
}

class Relation extends DateTimeEntity {
  @OneToOne(() => TeamSetting, (e) => e.team, { cascade: true })
  @JoinColumn({ name: 'setting' })
  setting: TeamSetting;

  @ManyToMany(() => User, (e) => e.teams)
  users: User[];

  @ManyToMany(() => Task, (e) => e.teams)
  @JoinTable({ name: 'team_tasks' })
  tasks: Task[];
}

@Entity('team')
export class Team extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TeamStatus,
    default: TeamStatus.Private,
  })
  status: TeamStatus;
}
