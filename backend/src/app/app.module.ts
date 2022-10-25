import { Module } from '@nestjs/common';
import { Modules } from '@/modules';
import { CoreModule } from '@/core';

@Module({
  imports: [CoreModule, Modules],
})
export class AppModule {}
