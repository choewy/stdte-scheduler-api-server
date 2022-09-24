import { hashSync, compareSync } from 'bcrypt';

export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const verifyPassword = (
  password: string,
  hashedPasssword: string,
): boolean => {
  return compareSync(password, hashedPasssword);
};
