import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums';
import { RedisConfig } from './interfaces';

export default registerAs(
  ConfigKey.Redis,
  (): RedisConfig => ({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB, 10),
  }),
);
