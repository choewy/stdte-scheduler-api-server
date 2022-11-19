import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../enums';
import { JwtConfig } from '../types';

export default registerAs(ConfigKey.Jwt, (): JwtConfig => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    subject: process.env.JWT_SUBJECT,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
});
