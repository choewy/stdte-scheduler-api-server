import { applyDecorators, Controller } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SwaggerControllerOptions } from './interfaces';

export const SwaggerController = (option?: SwaggerControllerOptions) => {
  if (!option) {
    return Controller();
  }

  const { prefix, tags, exclude, ...options } = option;

  const decorators = [];

  if (prefix) {
    decorators.push(Controller(prefix));
  } else {
    decorators.push(Controller(options));
  }

  if (tags) {
    if (Array.isArray(tags)) {
      decorators.push(ApiTags(...tags));
    } else {
      decorators.push(ApiTags(tags));
    }
  }

  if (exclude) {
    decorators.push(ApiExcludeController(true));
  }

  return applyDecorators(...decorators);
};
