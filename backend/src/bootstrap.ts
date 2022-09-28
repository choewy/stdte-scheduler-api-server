import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
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
import { ErrorFilter } from './appllication/filter/error.filter';
import { HttpExceptionFilter } from './appllication/filter';
import { PipeValidator } from './appllication/validator';
import { ClassInterceptor, LogInterceptor } from './appllication/interceptor';
import { LoggerService } from './core/logger';

export class Bootstrap {
  private app: INestApplication;
  private loggerService: LoggerService;
  private configs: {
    server: ServerConfig;
    cors: CorsConfig;
    master: UserConfig;
    admin: UserConfig;
  };

  constructor(private readonly module: any) {}

  private get options() {
    const appName = 'API-SERVER';
    const winstonConsole = new WinstonTransfort.Console({
      level: 'silly',
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

    this.loggerService = this.app.get(LoggerService);
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
    await swagger.setup(coreService.globalToken);
  }

  private async useGlobalPipe(): Promise<void> {
    this.app.useGlobalPipes(new PipeValidator());
  }

  private async useGlobalFilter(): Promise<void> {
    this.app.useGlobalFilters(
      new ErrorFilter(this.loggerService),
      new HttpExceptionFilter(this.loggerService),
    );
  }

  private async useGlobalInterceptor(): Promise<void> {
    const reflector = this.app.get(Reflector);
    this.app.useGlobalInterceptors(
      new ClassInterceptor(reflector),
      new LogInterceptor(this.loggerService),
    );
  }

  async init() {
    await this.getConfig();
    await this.setTempDir();
    await this.setMiddleware();
    await this.setCors();
    await this.setDatabase();
    await this.useSwagger();
    await this.useGlobalPipe();
    await this.useGlobalFilter();
    await this.useGlobalInterceptor();
  }

  async listen(): Promise<void> {
    const { server } = this.configs;
    this.app.listen(server.port, server.host);
  }
}
