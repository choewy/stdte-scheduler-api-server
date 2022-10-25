import { Logger, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [Logger, LoggerService],
  exports: [Logger, LoggerService],
})
export class LoggerModule {}
