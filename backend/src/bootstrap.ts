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
import { SwaggerDocument } from './core/swagger';

export class Bootstrap {
  private app: INestApplication;
  private configs: {
    server: ServerConfig;
    cors: CorsConfig;
    master: MasterConfig;
  };

  constructor(private readonly module: any) {}

  private async getConfig(): Promise<void> {
    this.app = await NestFactory.create(this.module);
    const configService = this.app.get(ConfigService);

    this.configs = {
      server: configService.get<ServerConfig>(ConfigToken.Server),
      cors: configService.get<CorsConfig>(ConfigToken.Cors),
      master: configService.get<MasterConfig>(ConfigToken.Master),
    };
  }

  private async setMiddleware(): Promise<void> {
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

  private async setCors(): Promise<void> {
    const { cors } = this.configs;
    this.app.enableCors(cors);
  }

  private async setDatabase(): Promise<void> {
    const { master } = this.configs;
    master.password = hashPassword(master.password);

    const coreService = this.app.get(CoreService);
    await coreService.initDefaultRole();
    await coreService.initMasterRole();
    await coreService.initMasterUser(master.username, master.password);
  }

  private async useSwagger(): Promise<void> {
    const { master } = this.configs;
    const coreService = this.app.get(CoreService);
    const globalToken = await coreService.getGlobalToken(master.username);

    const swagger = new SwaggerDocument(this.app);
    swagger.setup(globalToken);
  }

  async init() {
    await this.getConfig();
    await this.setMiddleware();
    await this.setCors();
    await this.setDatabase();
    await this.useSwagger();
  }

  async listen(): Promise<void> {
    const { server } = this.configs;
    Luxon.defaultZone = server.timezone;
    this.app.listen(server.port, server.host);
  }
}
