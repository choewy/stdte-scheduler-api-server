import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FilterLogCtx } from '../ctx';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  async catch(error: any, host: ArgumentsHost) {
    return new FilterLogCtx(
      this.logger,
      host.switchToHttp(),
      new InternalServerErrorException(),
      error,
    );
  }
}
