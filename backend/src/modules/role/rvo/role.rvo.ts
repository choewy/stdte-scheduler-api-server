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
  members: RoleUserRvo[];
}

export const roleRvoConstructor = (row: Role) => {
  return classConstructor(new RoleRvo(), {
    rid: row.rid,
    name: row.name,
    read_team: row.read_team,
    write_team: row.write_team,
    update_team: row.update_team,
    delete_team: row.delete_team,
    read_member: row.read_member,
    write_member: row.write_member,
    update_member: row.update_member,
    delete_member: row.delete_member,
    read_task: row.read_task,
    write_task: row.write_task,
    update_task: row.update_task,
    delete_task: row.delete_task,
    members: roleUsersConstructor(row),
  });
};
