import { CoreModule } from '@/core';
import { ServiceModule } from '@/service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule, ServiceModule],
  controllers: [AppController],
})
export class AppModule {}
