import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly SALT_OR_ROUNDS = 10;

  hash(value: string): string {
    return bcrypt.hashSync(value, this.SALT_OR_ROUNDS);
  }

  verify(plainText: string, encrypted: string): boolean {
    return bcrypt.compareSync(plainText, encrypted);
  }
}
