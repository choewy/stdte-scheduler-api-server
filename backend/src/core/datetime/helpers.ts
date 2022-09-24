import { DateTime } from 'luxon';

export const LocalDateTime = (): DateTime => {
  return DateTime.local();
};

export const JSDateTime = (): Date => {
  return DateTime.local().toJSDate();
};

export const DateTimeToISO = (datetime: DateTime): string => {
  if (datetime) {
    return datetime.toISO({ includeOffset: true });
  }
};

export const DateTimeFromJSDate = (date: Date) => {
  return DateTime.fromJSDate(date);
};
