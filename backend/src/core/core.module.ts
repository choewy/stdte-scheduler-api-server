import { EventModule } from './event';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey, configs } from './configs';
import { DocumentModule } from './document';
import { LoggerModule, LoggerService } from './logger';
import { BcryptService } from './bcrypt';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['./.env', './.env.schema'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(ConfigKey.Typeorm),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<JwtSignOptions>(ConfigKey.Jwt),
    }),
    DocumentModule,
    LoggerModule,
    EventModule,
  ],
  providers: [JwtService, LoggerService, BcryptService],
  exports: [JwtService, LoggerService, BcryptService],
})
export class CoreModule {}
