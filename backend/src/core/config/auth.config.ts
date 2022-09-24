import { registerAs } from '@nestjs/config';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { AuthConfig, AuthEnv } from './interfaces';

export default registerAs(ConfigToken.Auth, (): AuthConfig => {
  const accessTokenEnv = getEnvWithPrefix<AuthEnv>(EnvKey.ACCESS_TOKEN);
  const refreshTokenEnv = getEnvWithPrefix<AuthEnv>(EnvKey.ACCESS_TOKEN);
  return {
    access: {
      secret: accessTokenEnv.secret,
      audience: accessTokenEnv.audience,
      subject: accessTokenEnv.subject,
      issuer: accessTokenEnv.issuer,
      expiresIn: accessTokenEnv.expiresIn,
    },
    refresh: {
      secret: refreshTokenEnv.secret,
      audience: refreshTokenEnv.audience,
      subject: refreshTokenEnv.subject,
      issuer: refreshTokenEnv.issuer,
      expiresIn: refreshTokenEnv.expiresIn,
    },
  };
});
