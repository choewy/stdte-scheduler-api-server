import { ControllerOptions } from '@nestjs/common';
import { ApiResponseMetadata } from '@nestjs/swagger';

export interface SwaggerControllerOptions extends ControllerOptions {
  prefix?: string | string[];
  tags?: string | string[];
  exclude?: boolean;
}

export interface SwaggerEndPointOptions<T> {
  method: T;
  path?: string | string[];
  summary?: string;
  description?: string;
  authGuard?: boolean;
  success?: ApiResponseMetadata[];
  error?: ApiResponseMetadata[];
  exclude?: boolean;
}
