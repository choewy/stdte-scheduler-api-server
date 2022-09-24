import { ApiOperation } from '@nestjs/swagger';

export const SwaggerSummary = (summary: string) => {
  return ApiOperation({ summary });
};
