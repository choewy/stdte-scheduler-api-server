import { NextHandleFunction } from 'connect';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtSignOptions } from '@nestjs/jwt';

export type CorsConfig = {
  origin?: (string | RegExp)[];
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  preflightContinue?: boolean;
};

export type ServerConfig = {
  port: number;
  host: string;
  helmet: NextHandleFunction;
  json: NextHandleFunction;
  urlencoded: NextHandleFunction;
  cors: CorsConfig;
};

export type JwtConfig = JwtSignOptions;

export type TypeOrmExtraFunction = {
  [name: string]: (
    field: { type: string; string: () => string },
    next: () => void,
  ) => void;
};

export type TypeOrmConfig = TypeOrmModuleOptions;
