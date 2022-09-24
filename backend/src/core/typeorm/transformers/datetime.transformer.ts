import { FindOperator, ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export class DateTimeTransformer implements ValueTransformer {
  to(
    value: Date | FindOperator<DateTime> | null,
  ): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    }

    if (value === null) {
      return null;
    }

    return DateTime.fromJSDate(value).toISO({ includeOffset: true });
  }

  from(value: Date | null): DateTime | null {
    return DateTime.fromJSDate(value);
  }
}
