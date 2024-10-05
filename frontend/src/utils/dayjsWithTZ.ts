import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DEFAULT_TIMEZONE = 'Asia/Kolkata';

export const dayjsWithTZ = (date?: dayjs.ConfigType) => {
    return dayjs(date).tz(DEFAULT_TIMEZONE);
};
