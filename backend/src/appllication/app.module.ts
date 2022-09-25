import { Module } from '@nestjs/common';
import { CoreModule } from '@/core';
import { AppController } from './app.controller';
import { ModulePackage } from '@/module';
import { LoggerModule } from '@/core/logger/logger.module';

@Module({
  imports: [CoreModule, LoggerModule, ModulePackage],
  controllers: [AppController],
})
export class AppModule {}
