import { DateTime } from 'luxon';

export const LocalDateTime = (): DateTime => {
  return DateTime.local();
};

export const DateTimeToISO = (datetime: DateTime): string => {
  if (DateTime.isDateTime(datetime)) {
    return datetime.toISO({ includeOffset: true });
  }
};
