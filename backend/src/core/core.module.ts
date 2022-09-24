import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config, ConfigToken } from './config';
import { RoleRepository, UserRepository } from './typeorm/repositories';
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
  providers: [RoleRepository, UserRepository, CoreService],
  exports: [CoreService],
})
export class CoreModule {}
