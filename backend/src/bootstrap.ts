import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { Settings as Luxon } from 'luxon';
import { CoreService } from '@/core';
import { SwaggerDocument } from '@/core/swagger';
import { utilities, WinstonModule } from 'nest-winston';
import {
  transports as WinstonTransfort,
  format as winstonFormat,
} from 'winston';
import {
  ConfigToken,
  CorsConfig,
  UserConfig,
  ServerConfig,
} from '@/core/config';
import { existsSync, mkdirSync } from 'fs';

export class Bootstrap {
  private app: INestApplication;
  private configs: {
    server: ServerConfig;
    cors: CorsConfig;
    master: UserConfig;
    admin: UserConfig;
  };

  constructor(private readonly module: any) {}

  private get options() {
    const appName = 'STDTE-TASK-SCHEDULER-API-SERVER';
    const winstonConsole = new WinstonTransfort.Console({
      level: 'info',
      format: winstonFormat.combine(
        winstonFormat.timestamp(),
        utilities.format.nestLike(appName, {
          prettyPrint: true,
          colors: true,
        }),
      ),
    });

    return {
      logger: WinstonModule.createLogger({
        transports: [winstonConsole],
      }),
    };
  }

  private async getConfig(): Promise<void> {
    this.app = await NestFactory.create(this.module, this.options);
    const configService = this.app.get(ConfigService);

    this.configs = {
      server: configService.get<ServerConfig>(ConfigToken.Server),
      cors: configService.get<CorsConfig>(ConfigToken.Cors),
      master: configService.get<UserConfig>(ConfigToken.Master),
      admin: configService.get<UserConfig>(ConfigToken.Admin),
    };
  }

  private async setTempDir(): Promise<void> {
    !existsSync('./temp') && mkdirSync('./temp');
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
    const { master, admin } = this.configs;
    const coreService = this.app.get(CoreService);
    await coreService.initRole();
    await coreService.initTeam();
    await coreService.initMaster(master);
    await coreService.initAdmin(admin);
  }

  private async useSwagger(): Promise<void> {
    const coreService = this.app.get(CoreService);
    const swagger = new SwaggerDocument(this.app);
    swagger.setup(await coreService.globalToken);
  }

  async init() {
    await this.getConfig();
    await this.setTempDir();
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
