import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKey, JwtConfig, registers, TypeOrmConfig } from './config';
import { SwaggerService } from './swagger';
import { BcryptService } from './utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: registers,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmConfig>(ConfigKey.TypeOrm),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<JwtConfig>(ConfigKey.Jwt),
    }),
  ],
  providers: [Logger, SwaggerService, JwtService, BcryptService],
  exports: [Logger, SwaggerService, JwtService, BcryptService],
})
export class CoreModule {}
