import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Task } from '../task/task.entity';

class Relation {
  @OneToOne(() => Task, (e) => e.taskSetting)
  task: Task;
}

@Entity('task_setting')
export class TaskSetting extends Relation {
  @PrimaryColumn()
  readonly id: number;

  @Column({ comment: '기본 여부' })
  default: boolean;

  @Column({ comment: '전체 여부' })
  global: boolean;

  @Column({ comment: '공개 여부' })
  visible: boolean;

  @Column({ comment: '진행 여부' })
  status: boolean;
}
