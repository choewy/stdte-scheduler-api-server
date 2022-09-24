import { DateTime } from 'luxon';
import { FindOperator, ValueTransformer } from 'typeorm';
import { DateTimeFromJSDate, DateTimeToISO } from '../../datetime';

export class DateTimeTransformer implements ValueTransformer {
  to(
    value: DateTime | FindOperator<DateTime> | null,
  ): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    }

    if (value === null) {
      return null;
    }

    return DateTimeToISO(value);
  }

  from(value: Date | null): DateTime | null {
    return DateTimeFromJSDate(value);
  }
}
