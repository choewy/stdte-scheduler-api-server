import { Module } from '@nestjs/common';
import { RedisModule, RedisService } from '../redis';
import { EventGateway } from './event.gateway';

@Module({
  imports: [RedisModule],
  providers: [RedisService, EventGateway],
  exports: [RedisService],
})
export class EventModule {}
