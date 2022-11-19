import { CoreModule } from '@/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
})
export class AppModule {}
