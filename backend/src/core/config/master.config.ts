import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helper';
import { MasterConfig } from './interfaces';

export default registerAs(ConfigToken.Master, (): MasterConfig => {
  return getEnvWithPrefix<MasterConfig>(EnvKey.MASTER);
});
