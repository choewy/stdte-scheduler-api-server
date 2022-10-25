import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NextHandleFunction } from 'connect';

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
