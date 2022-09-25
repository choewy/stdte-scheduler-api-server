import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { RolePolicy } from './role-policy.entity';
import { DateTimeEntity } from './datetime.entity';

class Relation extends DateTimeEntity {
  @ManyToMany(() => User, (e) => e.roles)
  users: User[];

  @OneToOne(() => RolePolicy, (e) => e.role, { cascade: true })
  @JoinColumn({ name: 'policy' })
  rolePolicy: RolePolicy;
}

@Entity('role')
export class Role extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ default: true })
  editable: boolean;

  @Column({ default: true })
  visible: boolean;
}
