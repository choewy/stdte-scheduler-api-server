import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';

class Relation {
  @OneToOne(() => Role, (e) => e.rolePolicy, { cascade: ['soft-remove'] })
  role: Role;
}

@Entity('role_policy')
export class RolePolicy extends Relation {
  @PrimaryColumn()
  roleId: number;

  @Column({ default: false })
  default: boolean;

  @Column({ default: false })
  master: boolean;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  manager: boolean;

  @Column({ default: false })
  member: boolean;
}
