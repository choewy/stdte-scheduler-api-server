import { classConstructor } from '@/core';
import { Role } from '@/typeorm';
import { Expose } from 'class-transformer';
import { RoleUserRvo, roleUsersConstructor } from './role-user.rvo';

export class RoleRvo {
  @Expose()
  rid: number;

  @Expose()
  name: string;

  @Expose()
  read_team: boolean;

  @Expose()
  write_team: boolean;

  @Expose()
  update_team: boolean;

  @Expose()
  delete_team: boolean;

  @Expose()
  read_member: boolean;

  @Expose()
  write_member: boolean;

  @Expose()
  update_member: boolean;

  @Expose()
  delete_member: boolean;

  @Expose()
  read_task: boolean;

  @Expose()
  write_task: boolean;

  @Expose()
  update_task: boolean;

  @Expose()
  delete_task: boolean;

  @Expose()
  users: RoleUserRvo[];
}

export const roleRvoConstructor = (role: Role) => {
  return classConstructor(new RoleRvo(), {
    rid: role.rid,
    name: role.name,
    read_team: role.read_team,
    write_team: role.write_team,
    update_team: role.update_team,
    delete_team: role.delete_team,
    read_member: role.read_member,
    write_member: role.write_member,
    update_member: role.update_member,
    delete_member: role.delete_member,
    read_task: role.read_task,
    write_task: role.write_task,
    update_task: role.update_task,
    delete_task: role.delete_task,
    users: roleUsersConstructor(role),
  });
};
