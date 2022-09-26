import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeEntity } from './datetime.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

class Relation extends DateTimeEntity {
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

  @Column({ default: false })
  default: boolean;

  @Column({ default: true })
  editable: boolean;
}
