import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

export enum PolicyStatus {
  All = 'all',
  System = 'system',
  Team = 'team',
  Only = 'only',
  None = 'none',
}

export interface RolePolicyInterface {
  read: PolicyStatus;
  write: PolicyStatus;
  delete: PolicyStatus;
  update: PolicyStatus;
}

class Relation {
  @OneToOne(() => Role, (e) => e.policy, { cascade: ['soft-remove'] })
  role: Role;
}

@Entity('role_policy')
export class RolePolicy extends Relation implements RolePolicyInterface {
  @PrimaryColumn()
  roleId: number;

  @Column({
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.Team,
  })
  read: PolicyStatus;

  @Column({
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.Only,
  })
  write: PolicyStatus;

  @Column({
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.Only,
  })
  update: PolicyStatus;

  @Column({
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.None,
  })
  delete: PolicyStatus;
}
