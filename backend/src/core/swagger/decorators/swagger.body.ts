import { MulterFilesInterceptor } from '@/core/multer';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiBodyOptions, ApiConsumes } from '@nestjs/swagger';

type SwaggerBodyFormat = 'default' | 'xwwwForm' | 'multipart';

const swaggerBodyFormat = {
  default: 'application/json',
  xwwwForm: 'application/x-www-form',
  multipart: 'multipart/form-data',
};

export const SwaggerBody = ({
  formats,
  ...options
}: ApiBodyOptions & { formats: SwaggerBodyFormat[] }) => {
  const decorators = [ApiBody(options)];

  formats.includes('multipart') &&
    decorators.push(UseInterceptors(MulterFilesInterceptor));

  const mimeTypes = formats.map((format) => swaggerBodyFormat[format]);

  !mimeTypes.includes(swaggerBodyFormat.default) &&
    mimeTypes.push(swaggerBodyFormat.default);

  return applyDecorators(...decorators, ApiConsumes(...mimeTypes));
};
