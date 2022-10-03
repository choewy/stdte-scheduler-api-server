import { localDateTime } from '@/core/datetime';
import { DateTime } from 'luxon';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeColumn } from '../../columns';
import { DateTimeEntity } from '../datetime.entity';
import { ChatRoom } from '../chat-room/chat-room.entity';
import { Role } from '../role/role.entity';
import { Team } from '../team/team.entity';

export enum UserStatus {
  Wait = 'wait',
  Reject = 'reject',
  Enable = 'enable',
  Disable = 'disable',
}

class Relation extends DateTimeEntity {
  @ManyToMany(() => Role, (e) => e.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Team, (e) => e.users)
  @JoinTable({ name: 'user_teams' })
  teams: Team[];

  @OneToMany(() => ChatRoom, (e) => e.host, { cascade: true })
  chatRooms: ChatRoom[];
}

@Entity('user')
export class User extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @PrimaryColumn()
  username: string;

  @Column({ default: null })
  email: string;

  @Column({})
  password: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Wait,
  })
  status: UserStatus;

  @DateTimeColumn({ default: null })
  disabledAt: DateTime;

  protected beforeInsert(): void {
    super.beforeInsert();
    this.disabledAt = localDateTime();
  }
}
