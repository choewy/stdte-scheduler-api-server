import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Task } from '../task';
import { Team } from '../team/team.entity';

@Entity()
export class TeamAndTask {
  @PrimaryColumn({ primary: false })
  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  teamId: number;
  team: Team;
  teams: Team[];

  @PrimaryColumn({ primary: false })
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  taskId: number;
  task: Task;
  tasks: Task[];
}
