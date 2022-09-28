import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolePolicy } from '../role-policy/role-policy.entity';
import { DateTimeEntity } from '../datetime.entity';
import { User } from '../user';

export enum RoleType {
  Master = 'master',
  Admin = 'admin',
  Manager = 'manager',
  Member = 'member',
  Viewer = 'viewer',
  Default = 'default',
}

export type RoleTypeKey = keyof typeof RoleType;

class Relation extends DateTimeEntity {
  @ManyToMany(() => User, (e) => e.roles)
  users: User[];

  @OneToOne(() => RolePolicy, (e) => e.role, { cascade: true })
  @JoinColumn({ name: 'policy' })
  policy: RolePolicy;
}

@Entity('role')
export class Role extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.Viewer,
  })
  type: RoleType;

  @Column({ default: true })
  editable: boolean;

  @Column({ default: true })
  visible: boolean;
}
