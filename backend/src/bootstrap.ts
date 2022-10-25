import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Settings as Luxon } from 'luxon';
import {
  ConfigKey,
  ServerConfig,
  DocumentService,
  winstonLogger as logger,
} from '@/core';
import { IoAdapter } from '@nestjs/platform-socket.io';

export class Bootstrap {
  private app: INestApplication;
  private configService: ConfigService;
  private documentService: DocumentService;

  private config<T>(key: ConfigKey): T {
    return this.configService.get<T>(key);
  }

  private async setting() {
    const { timezone, urlencoded, json, cors, prefix } =
      this.config<ServerConfig>(ConfigKey.Server);

    Luxon.defaultZone = timezone;

    this.app.use(urlencoded);
    this.app.use(json);
    this.app.enableCors(cors);
    this.app.setGlobalPrefix(prefix);

    this.app.useWebSocketAdapter(new IoAdapter(this.app));
    await this.documentService.setup(this.app);
  }

  async create(module: any) {
    const options = { logger };

    this.app = await NestFactory.create(module, options);
    this.configService = this.app.get(ConfigService);
    this.documentService = this.app.get(DocumentService);

    await this.setting();
    await this.listen();

    return this.app;
  }

  private async listen() {
    const { port, host } = this.config<ServerConfig>(ConfigKey.Server);

    await this.app.listen(port, host);

    if (process.env.pm_id) {
      process.send('ready');
    }
  }
}
