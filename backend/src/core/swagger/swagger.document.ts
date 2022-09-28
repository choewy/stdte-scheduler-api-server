import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigToken, SwaggerConfig } from '../config';

export class SwaggerDocument {
  private readonly config: SwaggerConfig;

  constructor(private readonly app: INestApplication) {
    this.config = app
      .get(ConfigService)
      .get<SwaggerConfig>(ConfigToken.Swagger);
  }

  private build() {
    return new DocumentBuilder()
      .setVersion(this.config.version)
      .setTitle(this.config.title)
      .setDescription(this.config.description)
      .setContact(
        this.config.contact.name,
        this.config.contact.url,
        this.config.contact.email,
      )
      .addBearerAuth(undefined, 'masterAuth')
      .addBearerAuth({
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
      })
      .build();
  }

  async setup(globalToken?: Promise<string>) {
    const token = await globalToken;
    const builder = this.build();
    const document = SwaggerModule.createDocument(this.app, builder);
    SwaggerModule.setup(this.config.path, this.app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        authAction: {
          masterAuth: {
            schema: {
              type: 'http',
              in: 'header',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            value: token,
          },
        },
      },
    });
  }
}
