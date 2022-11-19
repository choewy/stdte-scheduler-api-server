import { NodeEnv } from '@/core/config';
import { LogLevel, NestApplicationOptions } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import { existsSync, mkdirSync } from 'fs';
import * as winston from 'winston';

export class AppOptions implements NestApplicationOptions {
  private static useConsole() {
    const winstonFormat = winston.format.timestamp({
      format: 'YYYY-MM-dd HH:mm:ss',
    });

    const nestFormat = utilities.format.nestLike('API-SERVER', {
      prettyPrint: true,
      colors: true,
    });

    return new winston.transports.Console({
      level: 'verbose' as LogLevel,
      format: winston.format.combine(winstonFormat, nestFormat),
    });
  }

  private static useFile() {
    const logDir = process.cwd() + process.env.LOG_DIR;

    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    return new winston.transports.File({
      filename: 'app.log',
      dirname: logDir,
    });
  }

  public static logger = WinstonModule.createLogger({
    transports: [NodeEnv.Prod.equal() ? this.useFile() : this.useConsole()],
  });
}
