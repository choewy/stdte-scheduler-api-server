import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { LOGGER_APP_NAME, LOGGER_LEVEL } from './constants';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: LOGGER_LEVEL,
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(LOGGER_APP_NAME, {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),
  ],
});
