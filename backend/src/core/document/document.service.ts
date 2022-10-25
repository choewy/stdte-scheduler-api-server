import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigKey, ServerConfig } from '@/core';
import {
  DOCS_DESCRIPTION,
  DOCS_PATH,
  DOCS_TITLE,
  DOCS_VERSION,
} from './constants';

@Injectable()
export class DocumentService {
  private readonly config: ServerConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<ServerConfig>(ConfigKey.Server);
  }

  private get builder() {
    return new DocumentBuilder()
      .setTitle(DOCS_TITLE)
      .setDescription(DOCS_DESCRIPTION)
      .setVersion(DOCS_VERSION)
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
        description: 'headers: { Authorization: "Bearer ${ ACCESS_TOKEN }" }',
      })
      .build();
  }

  async setup(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.builder);
    SwaggerModule.setup(`${this.config.prefix}${DOCS_PATH}`, app, document);
  }
}
