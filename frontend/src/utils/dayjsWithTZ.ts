import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DEFAULT_TIMEZONE = 'Asia/Kolkata';

export const dayjsWithTZ = (date?: dayjs.ConfigType) => {
  return dayjs(date).tz(DEFAULT_TIMEZONE);
};
