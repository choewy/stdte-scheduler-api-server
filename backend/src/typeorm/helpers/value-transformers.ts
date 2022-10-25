import { DateTime } from 'luxon';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DateTimeTransformer implements ValueTransformer {
  to(
    value: DateTime | FindOperator<DateTime> | null,
  ): string | FindOperator<DateTime> | null {
    if (value === null) {
      return null;
    }

    if (value instanceof FindOperator) {
      return value;
    } else {
      return value.toSQL({ includeOffset: false });
    }
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}
