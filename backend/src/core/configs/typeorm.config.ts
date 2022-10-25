import { readFileSync } from 'fs';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigKey } from './enums';
import { isLocal, isProduct } from './helpers';
import { DateTime } from 'luxon';

export default registerAs(
  ConfigKey.Typeorm,
  (): TypeOrmModuleOptions => ({
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: isLocal()
      ? process.env.TYPEORM_LOGGING === 'true'
      : ['warn', 'error'],
    entities: process.env.TYPEORM_ENTITIES.split(', '),
    migrations: process.env.TYPEORM_MIGRATIONS.split(', '),
    timezone: process.env.TYPEORM_TIMEZONE,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
    ssl: isProduct() && {
      required: true,
      rejectUnauthorized: true,
      ca: readFileSync(process.env.TYPEORM_CA_PATH).toString(),
    },
    extra: {
      typeCast: (
        field: {
          type: string;
          string: () => string;
        },
        next: () => void,
      ) => {
        const { type } = field;

        if (type === 'DATE') {
          const val = field.string();
          return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd');
        }

        if (type === 'DATETIME') {
          const val = field.string();
          return val === null
            ? null
            : DateTime.fromFormat(val, 'yyyy-MM-dd HH:mm:ss');
        }

        return next();
      },
    },
  }),
);
