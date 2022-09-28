import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export interface ServerEnv {
  host: string;
  port: string;
  limit: string;
  tempDir: string;
  referer: string;
}

export interface CorsEnv {
  origin: string;
  methods: string;
  allowedHeaders: string;
  exposedHeaders: string;
  preflight: string;
  preflightContinue: string;
  credentials: string;
  optionsSuccessStatus: string;
}

export interface AuthEnv {
  secret: string;
  audience: string;
  subject: string;
  issuer: string;
  expiresIn: string;
}

export interface SwaggerEnv {
  version: string;
  path: string;
  title: string;
  description: string;
  contactName: string;
  contactUrl: string;
  contactEmail: string;
}

export interface TypeormEnv {
  type: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  synchronize: string;
  logging: string;
  entities: string;
  migrations: string;
  timezone: string;
}

export interface ServerConfig {
  host: string;
  port: number;
  limit: string;
  tempDir: string;
  referer: string;
}

export type CorsConfig = CorsOptions;

export interface AuthConfig {
  access: {
    secret: string;
    audience: string;
    subject: string;
    issuer: string;
    expiresIn: string;
  };
  refresh: {
    secret: string;
    audience: string;
    subject: string;
    issuer: string;
    expiresIn: string;
  };
}

export interface UserConfig {
  username: string;
  password: string;
  nickname: string;
}

export interface SwaggerConfig {
  version: string;
  path: string;
  title: string;
  description: string;
  contact: {
    name: string;
    url: string;
    email: string;
  };
}
