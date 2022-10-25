import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
