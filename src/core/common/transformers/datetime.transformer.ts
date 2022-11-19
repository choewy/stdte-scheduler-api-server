import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

const formatByLengthMaps = {
  6: 'yyyyMM',
  7: 'yyyy-MM',
  8: 'yyyyMMdd',
  10: 'yyyy-MM-dd',
};

export const ToDateTime = () =>
  Transform(({ value }) => {
    const length = value.length;

    if ([6, 7, 8, 10].includes(length)) {
      return DateTime.fromFormat(value, formatByLengthMaps[length]);
    } else {
      return null;
    }
  });
