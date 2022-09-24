import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helper';
import { TypeormEnv } from './interfaces';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs(ConfigToken.Typeorm, (): TypeOrmModuleOptions => {
  const env = getEnvWithPrefix<TypeormEnv>(EnvKey.TYPEORM);
  return {
    type: env.type as any,
    host: env.host,
    port: parseInt(env.port),
    database: env.database,
    username: env.username,
    password: env.password,
    synchronize: env.synchronize === 'true',
    logging: env.logging === 'true',
    entities: env.entities.split(', '),
    migrations: env.migrations.split(', '),
    timezone: env.timezone,
    namingStrategy: new SnakeNamingStrategy(),
  };
});
