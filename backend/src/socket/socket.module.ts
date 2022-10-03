import { Module } from '@nestjs/common';
import { AppSocketGateway } from './socket.gateway';
import { AppSocketRepository } from './socket.repository';

@Module({
  providers: [AppSocketGateway, AppSocketRepository],
  exports: [AppSocketGateway],
})
export class AppSocketModule {}
