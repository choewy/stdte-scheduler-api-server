import {
  INestApplication,
  Logger,
  NestApplicationOptions,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { ConfigKey, ServerConfig } from '@/core/config';
import { SwaggerService } from '@/core/swagger';
import {
  ErrorFilter,
  HttpFilter,
  LogInterceptor,
  SerializeInterceptor,
  ValidatePipe,
} from './core/global';

export class Bootstrap extends NestFactoryStatic {
  private static app: INestApplication;
  private static logger: Logger;
  private static config: ServerConfig;

  public static async create(
    module: any,
    options?: NestApplicationOptions,
  ): Promise<void> {
    this.app = await NestFactory.create(module, options);
    this.logger = this.app.get(Logger);
    this.config = this.app
      .get(ConfigService)
      .get<ServerConfig>(ConfigKey.Server);
  }

  public static async setup(): Promise<void> {
    const { helmet, json, urlencoded, cors } = this.config;

    this.app.use(helmet);
    this.app.use(json);
    this.app.use(urlencoded);
    this.app.enableCors(cors);

    this.app.useGlobalFilters(
      new ErrorFilter(this.logger),
      new HttpFilter(this.logger),
    );

    this.app.useGlobalInterceptors(
      new SerializeInterceptor(this.app.get(Reflector)),
      new LogInterceptor(this.logger),
    );

    this.app.useGlobalPipes(new ValidatePipe());

    this.app.get(SwaggerService).applyToApplication(this.app);
  }

  public static async listen(): Promise<void> {
    const { port, host } = this.config;
    return this.app.listen(port, host);
  }
}
