import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export const DateTimetoformat = (format?: string) =>
  Transform(({ value }) => {
    if (DateTime.isDateTime(value)) {
      if (format) {
        return value.toFormat(format);
      } else {
        return value.toFormat('yyyy-MM-dd HH:mm:ss');
      }
    }

    return null;
  });
