import { Module } from '@nestjs/common';
import { CoreModule } from '@/core';
import { AppServerController } from './server.controller';
import { ModulePackage } from '@/module';
import { LoggerModule } from '@/core/logger/logger.module';
import { AppSocketModule } from '@/socket';

@Module({
  imports: [CoreModule, AppSocketModule, LoggerModule, ModulePackage],
  controllers: [AppServerController],
})
export class AppServerModule {}
