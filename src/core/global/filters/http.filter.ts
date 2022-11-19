import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FilterLogCtx } from '../ctx';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    return new FilterLogCtx(this.logger, host.switchToHttp(), exception);
  }
}
