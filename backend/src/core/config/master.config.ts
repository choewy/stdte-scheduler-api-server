import { registerAs } from '@nestjs/config';
import { hashPassword } from '../bcrypt';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { UserConfig } from './interfaces';

export default registerAs(ConfigToken.Master, (): UserConfig => {
  const config = getEnvWithPrefix<UserConfig>(EnvKey.MASTER);
  return Object.assign(config, {
    password: hashPassword(config.password),
  });
});
