import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { UserConfig } from './interfaces';

export default registerAs(ConfigToken.Admin, (): UserConfig => {
  return getEnvWithPrefix<UserConfig>(EnvKey.ADMIN);
});
