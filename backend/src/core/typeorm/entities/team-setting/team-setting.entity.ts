import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Team } from '../team/team.entity';

class Relation {
  @OneToOne(() => Team, (e) => e.setting, { onDelete: 'CASCADE' })
  team: Team;
}

@Entity('team_setting')
export class TeamSetting extends Relation {
  @PrimaryColumn()
  teamId: number;
}
