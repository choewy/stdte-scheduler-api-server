import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ConfigToken, CorsConfig, ServerConfig } from '@/core/config';
import { json, urlencoded } from 'express';

export class Bootstrap {
  private app: INestApplication;
  private configs: {
    server: ServerConfig;
    cors: CorsConfig;
  };

  constructor(private readonly module: any) {}

  private async registConfig(): Promise<void> {
    const configService = this.app.get(ConfigService);

    this.configs = {
      server: configService.get<ServerConfig>(ConfigToken.Server),
      cors: configService.get<CorsConfig>(ConfigToken.Cors),
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

  async listen(): Promise<void> {
    this.app = await NestFactory.create(this.module);
    await this.registConfig();
    await this.registMiddleware();
    await this.registCors();

    const { server } = this.configs;
    this.app.listen(server.port, server.host);
  }
}
