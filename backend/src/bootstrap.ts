import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { Settings as Luxon } from 'luxon';
import { CoreService } from '@/core/core.service';
import {
  ConfigToken,
  CorsConfig,
  MasterConfig,
  ServerConfig,
} from '@/core/config';
import { hashPassword } from './core/bcrypt';

export class Bootstrap {
  private app: INestApplication;
  private configs: {
    server: ServerConfig;
    cors: CorsConfig;
    master: MasterConfig;
  };

  constructor(private readonly module: any) {}

  private async registConfig(): Promise<void> {
    const configService = this.app.get(ConfigService);

    this.configs = {
      server: configService.get<ServerConfig>(ConfigToken.Server),
      cors: configService.get<CorsConfig>(ConfigToken.Cors),
      master: configService.get<MasterConfig>(ConfigToken.Master),
    };
  }

  private async registMiddleware(): Promise<void> {
    const { server } = this.configs;

    this.app.use(
      json({
        limit: server.limit,
      }),
    );

    this.app.use(
      urlencoded({
        limit: server.limit,
        extended: true,
      }),
    );
  }

  private async registCors(): Promise<void> {
    const { cors } = this.configs;
    this.app.enableCors(cors);
  }

  private async initDatabase(): Promise<void> {
    const { master } = this.configs;
    master.password = hashPassword(master.password);

    const coreService = this.app.get(CoreService);
    await coreService.initDefaultRole();
    await coreService.initMasterRole();
    await coreService.initMasterUser(master.username, master.password);
  }

  async listen(): Promise<void> {
    this.app = await NestFactory.create(this.module);

    await this.registConfig();
    await this.registMiddleware();
    await this.registCors();
    await this.initDatabase();

    const { server } = this.configs;
    Luxon.defaultZone = server.timezone;
    this.app.listen(server.port, server.host);
  }
}
