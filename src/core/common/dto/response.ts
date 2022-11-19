import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export const ListResponseType = <T>(type: T) => {
  class ListResponse {
    @ApiResponseProperty()
    @Expose()
    count: number;

    @ApiResponseProperty({
      type: [type],
    })
    @Expose()
    rows: Array<any>;
  }

  return ListResponse;
};
