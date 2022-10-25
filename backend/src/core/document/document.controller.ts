import { Response } from 'express';
import { Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey, ServerConfig } from '../configs';
import { SwaggerController, SwaggerEndPoint } from './decorators';
import { DOCS_PATH } from './constants';

@SwaggerController()
export class DocumentController {
  private readonly prefix: string;

  constructor(private readonly configService: ConfigService) {
    this.prefix = this.configService.get<ServerConfig>(ConfigKey.Server).prefix;
  }

  @SwaggerEndPoint({
    method: 'GET',
    exclude: true,
  })
  docs(@Res() response: Response) {
    return response.redirect(`${this.prefix}${DOCS_PATH}`);
  }
}
