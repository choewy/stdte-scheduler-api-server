import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';
import { ConfigToken } from './config/enums';
import { CoreService } from './core.service';
import { RoleRepository } from './typeorm/repositories/role.repository';

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
  providers: [RoleRepository, CoreService],
  exports: [CoreService],
})
export class CoreModule {}
