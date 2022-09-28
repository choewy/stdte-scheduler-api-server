import { Transform } from 'class-transformer';

export const DateTimetoformat = (format?: string) =>
  Transform(({ value }) => {
    return value && value.toFormat(format ? format : 'yyyy-MM-dd HH:mm:ss');
  });
