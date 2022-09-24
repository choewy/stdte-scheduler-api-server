import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { ServerConfig, ServerEnv } from './interfaces';
import { getEnvWithPrefix } from './helper';

export default registerAs(ConfigToken.Server, (): ServerConfig => {
  const env = getEnvWithPrefix<ServerEnv>(EnvKey.SERVER);
  return {
    host: env.host,
    port: parseInt(env.port),
    limit: env.limit,
    tempDir: env.tempDir,
    referer: env.referer,
    timezone: env.timezone,
  };
});
