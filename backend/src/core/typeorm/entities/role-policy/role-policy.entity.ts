import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Role } from '../role/role.entity';

export enum PolicyRange {
  All = 'all',
  System = 'system',
  Team = 'team',
  Only = 'only',
  None = 'none',
}

export interface RolePolicyInterface {
  read: PolicyRange;
  write: PolicyRange;
  delete: PolicyRange;
  update: PolicyRange;
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
    enum: PolicyRange,
    default: PolicyRange.Team,
  })
  read: PolicyRange;

  @Column({
    type: 'enum',
    enum: PolicyRange,
    default: PolicyRange.Only,
  })
  write: PolicyRange;

  @Column({
    type: 'enum',
    enum: PolicyRange,
    default: PolicyRange.Only,
  })
  update: PolicyRange;

  @Column({
    type: 'enum',
    enum: PolicyRange,
    default: PolicyRange.None,
  })
  delete: PolicyRange;
}
