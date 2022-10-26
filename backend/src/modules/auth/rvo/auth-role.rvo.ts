import { Expose } from 'class-transformer';

export class AuthRoleRvo {
  @Expose()
  is_admin: boolean;

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
}
