import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helper';
import { SwaggerConfig, SwaggerEnv } from './interfaces';

export default registerAs(ConfigToken.Swagger, (): SwaggerConfig => {
  const env = getEnvWithPrefix<SwaggerEnv>(EnvKey.SWAGGER);
  return {
    version: env.version,
    title: env.title,
    description: env.description,
    path: env.path,
    contact: {
      name: env.contactName,
      url: env.contactUrl,
      email: env.contactEmail,
    },
  };
});
