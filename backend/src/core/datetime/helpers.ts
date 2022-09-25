import { DateTime } from 'luxon';

export const localDateTime = (): DateTime => {
  return DateTime.local();
};

export const dateTimeToISO = (datetime: DateTime): string => {
  if (DateTime.isDateTime(datetime)) {
    return datetime.toISO({ includeOffset: true });
  }
};
