import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigKey } from './enums';

export default registerAs(
  ConfigKey.Jwt,
  (): JwtSignOptions => ({
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    subject: process.env.JWT_SUBJECT,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }),
);
