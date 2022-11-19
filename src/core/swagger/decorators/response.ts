import { ExceptionResponse } from '@/core/global';
import {
  applyDecorators,
  HttpCode,
  HttpException,
  HttpStatus,
  Type,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

type ApiResponseOptions = {
  status?: HttpStatus;
  type?: Type<unknown> | Function | [Function] | string;
  errors?: Array<ClassConstructor<HttpException>>;
};

export const ApiResponseType = ({
  status,
  type,
  errors,
}: ApiResponseOptions) => {
  const decorators = [];

  decorators.push(
    ApiResponse({
      status: status || 200,
      type,
    }),
  );

  if (status) {
    decorators.push(HttpCode(status));
  }

  if (errors && errors.length > 0) {
    const ctx = errors.reduce<
      {
        status: number;
        names: string[];
      }[]
    >((prev, Exception) => {
      const exception = new Exception();
      const status = exception.getStatus();
      const name = exception.name.replace('Exception', '');

      const row = prev.find((row) => row.status === status);

      if (row && !row.names.includes(name)) {
        row.names.push(name);
      }

      if (!row) {
        prev.push({
          status,
          names: [name],
        });
      }

      return prev;
    }, []);

    ctx.forEach(({ status, names }) => {
      decorators.push(
        ApiResponse({
          status,
          type: ExceptionResponse,
          description: names.join('<br>'),
        }),
      );
    });
  }

  return applyDecorators(...decorators);
};
