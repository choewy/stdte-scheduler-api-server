import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helper';
import { CorsConfig, CorsEnv } from './interfaces';

export default registerAs(ConfigToken.Cors, (): CorsConfig => {
  const env = getEnvWithPrefix<CorsEnv>(EnvKey.CORS);
  return {
    origin: env.origin.split(',').map((regexp) => new RegExp(regexp)),
    methods: env.methods.split(','),
    allowedHeaders: env.allowedHeaders.split(','),
    exposedHeaders: env.exposedHeaders.split(','),
    preflightContinue: env.preflightContinue === 'true',
    credentials: env.credentials === 'true',
    optionsSuccessStatus: parseInt(env.optionsSuccessStatus),
  };
});
