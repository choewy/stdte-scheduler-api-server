import { Transform } from 'class-transformer';

export const DateTimeToString = () => {
  return Transform(({ value }) => {
    if (value === null) {
      return null;
    }

    return value.toSQL({ includeOffset: false });
  });
};
