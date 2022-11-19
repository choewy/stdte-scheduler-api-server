import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { DataSource, Repository } from 'typeorm';
import { ConfigKey, JwtConfig, NodeEnv } from '../config';
import { User, UserStatus, UserType } from '../typeorm/entities';
import { BcryptService } from '../utils';
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
  private readonly config: JwtConfig;
  private readonly userRepo: Repository<User>;

  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    this.config = this.configService.get<JwtConfig>(ConfigKey.Jwt);
    this.userRepo = this.dataSource.getRepository(User);
  }

  private readonly swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  };

  private readonly swaggerBuilder = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setVersion(SWAGGER_VERSION)
    .setDescription(SWAGGER_DESCRIPTION)
    .setContact(
      SWAGGER_CONTACT_NAME,
      SWAGGER_CONTACT_URL,
      SWAGGER_CONTACT_EMAIL,
    );

  async applyToApplication(app: INestApplication) {
    const builder = this.swaggerBuilder;
    const options = this.swaggerOptions;

    if (NodeEnv.Prod.equal()) {
      builder.addBearerAuth(
        {
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'bearer',
        },
        'bearer',
      );
    } else {
      let user = await this.userRepo.findOneBy({
        name: SwaggerAuth.Swagger.name,
      });

      const swagger = new User();

      swagger.id = user?.id || undefined;
      swagger.name = SwaggerAuth.Swagger.name;
      swagger.email = SwaggerAuth.Swagger.email;
      swagger.password = this.bcryptService.hash('swagger');
      swagger.type = UserType.Admin;
      swagger.status = UserStatus.Accept;

      user = await this.userRepo.save(swagger);

      const token = this.jwtService.sign(
        { id: user.id },
        { ...this.config, expiresIn: '20y' },
      );

      builder.addBearerAuth(undefined, 'bearer');
      options.swaggerOptions.authAction = {
        bearer: {
          schema: {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'bearer',
          },
          value: token,
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
