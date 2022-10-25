import { classConstructor } from '@/core';
import { Role } from '@/typeorm';
import { Expose } from 'class-transformer';

export class RoleUserRvo {
  @Expose()
  uid: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

export const roleUsersConstructor = (role: Role) => {
  return role.members.map((user) =>
    classConstructor(new RoleUserRvo(), {
      uid: user.uid,
      name: user.name,
      email: user.email,
    }),
  );
};