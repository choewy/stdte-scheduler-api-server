import { registerAs } from '@nestjs/config';
import { hashPassword } from '../bcrypt';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { UserConfig } from './interfaces';

export default registerAs(ConfigToken.Admin, (): UserConfig => {
  const config = getEnvWithPrefix<UserConfig>(EnvKey.ADMIN);
  return Object.assign(config, {
    password: hashPassword(config.password),
  });
});
