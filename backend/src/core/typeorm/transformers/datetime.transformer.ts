import { DateTime } from 'luxon';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DateTimeTransformer implements ValueTransformer {
  to(
    value: DateTime | FindOperator<DateTime> | null,
  ): string | FindOperator<DateTime> | null {
    if (value instanceof FindOperator) {
      return value;
    } else if (value === null) {
      return;
    }

    if (DateTime.isDateTime(value)) {
      return value.toSQL({ includeOffset: true });
    }
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}
