import { ExceptionDto } from '@/server/dto';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const SwaggerResponse = ({
  status,
  type,
  description,
}: {
  status: HttpStatus;
  type?: any;
  description?: string;
}) => {
  if (status < 400) {
    return ApiResponse({ status, type, description });
  } else {
    return ApiResponse({ status, description, type: ExceptionDto });
  }
};
