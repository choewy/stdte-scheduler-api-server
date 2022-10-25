import { Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { User } from '../user';

@Entity('role_and_user')
export class RoleAndUser {
  @PrimaryColumn()
  rid: number;
  role: Role;
  roles: Role[];

  @PrimaryColumn()
  uid: number;
  user: User;
  users: User[];
}
