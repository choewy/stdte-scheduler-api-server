import { ExceptionDto } from '@/appllication/dto';
import { MulterFilesInterceptor } from '@/core/multer';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiBodyOptions, ApiConsumes } from '@nestjs/swagger';
import { SwaggerResponse } from './swagger.response';

type SwaggerBodyFormat = 'default' | 'xwwwForm' | 'multipart';

const swaggerBodyFormat = {
  default: 'application/json',
  xwwwForm: 'application/x-www-form-urlencoded',
  multipart: 'multipart/form-data',
};

export const SwaggerBody = ({
  formats,
  ...options
}: ApiBodyOptions & { formats: SwaggerBodyFormat[] }) => {
  const decorators = [
    ApiBody(options),
    SwaggerResponse({
      status: 400,
      type: ExceptionDto,
      description: '유효성 검사 오류',
    }),
  ];

  formats.includes('multipart') &&
    decorators.push(UseInterceptors(MulterFilesInterceptor));

  const mimeTypes = formats.map((format) => swaggerBodyFormat[format]);

  !mimeTypes.includes(swaggerBodyFormat.default) &&
    mimeTypes.push(swaggerBodyFormat.default);

  return applyDecorators(...decorators, ApiConsumes(...mimeTypes));
};
