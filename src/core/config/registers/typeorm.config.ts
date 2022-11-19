import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../enums';
import { TypeOrmConfig, TypeOrmExtraFunction } from '../types';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { NodeEnv } from '../node-env';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { DateTime } from 'luxon';
import { AdvancedConsoleLogger, FileLogger } from 'typeorm';

class QueryConsoleLogger extends AdvancedConsoleLogger {
  constructor() {
    super(true);
  }
}

class QueryFileLogger extends FileLogger {
  constructor() {
    const LOG_DIR_PATH = process.env.LOG_DIR;
    const LOG_FILE_NAME = '/query.log';

    if (!existsSync(process.cwd() + LOG_DIR_PATH)) {
      mkdirSync(process.cwd() + LOG_DIR_PATH, { recursive: true });
    }

    super(true, {
      logPath: LOG_DIR_PATH + LOG_FILE_NAME,
    });
  }
}

export default registerAs(ConfigKey.TypeOrm, (): TypeOrmConfig => {
  const typeCast: TypeOrmExtraFunction = {
    typeCast: (field, next) => {
      const { type } = field;

      if (type === 'DATE') {
        const format = 'yyyy-MM-dd';
        const val = field.string()?.slice(0, 10);
        return val === null ? null : DateTime.fromFormat(val, format);
      }

      if (type === 'DATETIME') {
        const format = 'yyyy-MM-dd HH:mm:ss';
        const val = field.string()?.slice(0, 19);
        return val === null ? null : DateTime.fromFormat(val, format);
      }

      return next();
    },
  };

  return {
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: NodeEnv.Local.equal()
      ? process.env.TYPEORM_LOGGING === 'true'
      : ['warn', 'error'],
    logger: NodeEnv.Local.equal()
      ? new QueryConsoleLogger()
      : new QueryFileLogger(),
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsRun: true,
    timezone: process.env.TYPEORM_TIMEZONE,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
    ssl: NodeEnv.Local.equal()
      ? undefined
      : {
          required: true,
          rejectUnauthorized: true,
          ca: readFileSync(process.env.TYPEORM_CA_PATH).toString(),
        },
    extra: { typeCast },
  };
});
