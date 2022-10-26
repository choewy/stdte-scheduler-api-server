import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolePolicies } from './interfaces';
import { RoleRelation } from './role.relation';

@Entity('role')
export class Role extends RoleRelation implements RolePolicies {
  @PrimaryGeneratedColumn()
  readonly rid: number;

  @Column()
  name: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: true })
  read_team: boolean;

  @Column({ default: false })
  write_team: boolean;

  @Column({ default: false })
  update_team: boolean;

  @Column({ default: false })
  delete_team: boolean;

  @Column({ default: true })
  read_member: boolean;

  @Column({ default: false })
  write_member: boolean;

  @Column({ default: false })
  update_member: boolean;

  @Column({ default: false })
  delete_member: boolean;

  @Column({ default: true })
  read_task: boolean;

  @Column({ default: false })
  write_task: boolean;

  @Column({ default: false })
  update_task: boolean;

  @Column({ default: false })
  delete_task: boolean;
}
