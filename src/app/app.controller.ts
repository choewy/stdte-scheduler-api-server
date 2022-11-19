import { SWAGGER_PATH } from '@/core/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('앱')
@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return;
  }

  @Get(['/', 'swagger', 'docs'])
  @ApiExcludeEndpoint(true)
  swaggerDocs(@Res() res: Response): void {
    return res.redirect(SWAGGER_PATH);
  }
}
