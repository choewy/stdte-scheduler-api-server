import { ApiPropertyOptions } from '@nestjs/swagger';

export type SwaggerResPropertyOptions = Pick<
  ApiPropertyOptions,
  'type' | 'example' | 'format' | 'enum' | 'deprecated'
>;
