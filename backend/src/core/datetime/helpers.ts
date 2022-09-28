import { DateTime } from 'luxon';

export const localDateTime = (): DateTime => {
  return DateTime.local();
};
