import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigToken, EnvKey } from './enums';
import { getEnvWithPrefix } from './helpers';
import { TypeormEnv } from './interfaces';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DateTime } from 'luxon';

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
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
      typeCast: (field: any, next: () => void) => {
        let val: string;

        switch (field.type) {
          case 'DATE':
            val = field.string();
            return val === null
              ? null
              : DateTime.fromFormat(
                  val.length > 10 ? val.slice(0, 10) : val,
                  'yyyy-MM-dd',
                );

          case 'DATETIME':
            val = field.string();
            return val === null
              ? null
              : DateTime.fromFormat(
                  val.length > 19 ? val.slice(0, 19) : val,
                  'yyyy-MM-dd HH:mm:ss',
                );

          default:
            return next();
        }
      },
    },
  };
});
