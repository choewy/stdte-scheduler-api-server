import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

export const SwaggerController = (
  options?: ControllerOptions & { tag?: string | string[]; exclude?: boolean },
) => {
  if (!options) {
    return Controller();
  }

  const { tag, exclude, ...controllerOptions } = options;
  const decorators = [Controller(controllerOptions)];

  tag && decorators.push(ApiTags(...tag));
  exclude && decorators.push(ApiExcludeController(true));

  return applyDecorators(...decorators);
};
