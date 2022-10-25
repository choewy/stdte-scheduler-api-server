import { classConstructor } from '@/core';
import { Role } from '@/typeorm';
import { Expose } from 'class-transformer';

export class RolePolicyRvo {
  @Expose()
  read: boolean;

  @Expose()
  write: boolean;

  @Expose()
  update: boolean;

  @Expose()
  delete: boolean;
}

export const rolePolicyConstructor = (
  role: Role,
  key: 'team' | 'member' | 'task',
) => {
  return classConstructor(new RolePolicyRvo(), {
    read: role[`read_${key}`],
    write: role[`write_${key}`],
    update: role[`update_${key}`],
    delete: role[`delete_${key}`],
  });
};
