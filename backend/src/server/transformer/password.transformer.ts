import { hashPassword } from '@/core/bcrypt';
import { Transform } from 'class-transformer';

export const HashPassword = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      return hashPassword(value);
    }

    return null;
  });
