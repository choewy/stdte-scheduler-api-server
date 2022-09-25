import { ApiOperation } from '@nestjs/swagger';

export const SwaggerSummary = (summary: string, description?: string) => {
  return ApiOperation({ summary, description });
};
