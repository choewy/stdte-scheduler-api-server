import { Logger, Module } from '@nestjs/common';
import { LoggerRepository } from './logger.repository';
import { LoggerService } from './logger.service';

@Module({
  providers: [Logger, LoggerRepository, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
