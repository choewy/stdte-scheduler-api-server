import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { NodeEnv } from '../config';
import {
  SWAGGER_CONTACT_EMAIL,
  SWAGGER_CONTACT_NAME,
  SWAGGER_CONTACT_URL,
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
  SWAGGER_VERSION,
} from './constants';
import { SwaggerAuth } from './swagger-auth';

@Injectable()
export class SwaggerService {
  private readonly swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  };

  private readonly swaggerBuilder = new DocumentBuilder()
    .setBasePath(SWAGGER_PATH)
    .setTitle(SWAGGER_TITLE)
    .setVersion(SWAGGER_VERSION)
    .setDescription(SWAGGER_DESCRIPTION)
    .setContact(
      SWAGGER_CONTACT_NAME,
      SWAGGER_CONTACT_URL,
      SWAGGER_CONTACT_EMAIL,
    )
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'bearer',
    });

  applyToApplication(app: INestApplication) {
    const builder = this.swaggerBuilder;
    const options = this.swaggerOptions;

    if (!NodeEnv.Prod.equal()) {
      builder.addBearerAuth(undefined, SwaggerAuth.Test.name);
      options.swaggerOptions.authAction = {
        [SwaggerAuth.Test.name]: {
          schema: {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'bearer',
          },
          value: SwaggerAuth.Test.token,
        },
      };
    }

    SwaggerModule.setup(
      SWAGGER_PATH,
      app,
      SwaggerModule.createDocument(app, builder.build()),
      options,
    );
  }
}
