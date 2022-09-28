import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeEntity } from '../datetime.entity';
import { TaskSetting } from '../task-setting/task-setting.entity';
import { Team } from '../team/team.entity';

class Relation extends DateTimeEntity {
  @OneToOne(() => TaskSetting, (e) => e.task)
  @JoinColumn({ name: 'task_setting' })
  taskSetting: TaskSetting;

  @ManyToMany(() => Team, (e) => e.tasks)
  teams: Team[];
}

@Entity('task')
export class Task extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ comment: '업무명' })
  name: string;
}
