import { registerAs } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { ConfigKey } from './enums';
import { ServerConfig } from './interfaces';

export default registerAs(
  ConfigKey.Server,
  (): ServerConfig => ({
    env: process.env.NODE_ENV,
    timezone: process.env.TZ,
    url: process.env.SERVER_URL,
    port: parseInt(process.env.SERVER_PORT, 10),
    host: process.env.SERVER_HOST,
    limit: process.env.SERVER_LIMIT,
    prefix: process.env.SERVER_PREFIX,
    json: json({
      limit: process.env.SERVER_LIMIT,
    }),
    urlencoded: urlencoded({
      extended: true,
      limit: process.env.SERVER_LIMIT,
    }),
    cors: {
      origin: process.env.CORS_ORIGIN.split(',').map((exp) => new RegExp(exp)),
      methods: process.env.CORS_METHODS.split(','),
      allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(','),
      exposedHeaders: process.env.CORS_EXPOSED_HEADERS.split(','),
      preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE === 'true',
      credentials: process.env.CORS_CREDENTIALS === 'true',
    },
  }),
);
