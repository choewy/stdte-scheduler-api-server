import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { JwtSignOptions } from '@nestjs/jwt';
import { NextHandleFunction } from 'connect';
import { RedisOptions } from 'ioredis';

export interface ServerConfig {
  env: string;
  timezone: string;
  url: string;
  port: number;
  host: string;
  limit: string;
  urlencoded: NextHandleFunction;
  json: NextHandleFunction;
  prefix: string;
  cors: CorsOptions;
}

export interface KakaoConfig {
  clientKey: string;
  adminKey: string;
  redirectUri: string;
}

export interface GithubConfig {
  clientKey: string;
  secretKey: string;
  redirectUri: string;
}

export type JwtConfig = JwtSignOptions;
export type RedisConfig = RedisOptions;
