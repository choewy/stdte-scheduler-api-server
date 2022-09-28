import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { UserConfig } from './interfaces';

export default registerAs(ConfigToken.Master, (): UserConfig => {
  return getEnvWithPrefix<UserConfig>(EnvKey.MASTER);
});
