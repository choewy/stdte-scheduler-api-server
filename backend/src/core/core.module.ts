import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config, ConfigToken } from './config';
import { JwtAuthService } from './jwt-auth';
import { CoreRepository } from './core.repository';
import { CoreService } from './core.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<TypeOrmModuleOptions>(ConfigToken.Typeorm);
      },
    }),
  ],
  providers: [JwtAuthService, CoreRepository, CoreService],
  exports: [JwtAuthService, CoreService],
})
export class CoreModule {}
