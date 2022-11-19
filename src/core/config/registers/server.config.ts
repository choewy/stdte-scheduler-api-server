import { registerAs } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { ServerConfig } from '..';
import { ConfigKey } from '../enums';
import helmet from 'helmet';

export default registerAs(ConfigKey.Server, (): ServerConfig => {
  const limit = process.env.SERVER_LIMIT;

  return {
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10),
    json: json({ limit }),
    urlencoded: urlencoded({ limit, extended: true }),
    helmet: helmet(),
    cors: {
      origin: process.env.SERVER_ORIGINS.split(',').map(
        (origin) => new RegExp(origin),
      ),
      methods: process.env.SERVER_METHODS.split(','),
      allowedHeaders: process.env.SERVER_ALLOWED_HEADERS.split(','),
      exposedHeaders: process.env.SERVER_EXPOSED_HEADERS.split(','),
      preflightContinue: process.env.SERVER_PREFLIGHT_CONTINUE === 'true',
      credentials: process.env.SERVER_CREDENTIALS === 'true',
    },
  };
});
