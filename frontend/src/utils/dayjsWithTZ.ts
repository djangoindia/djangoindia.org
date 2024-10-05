import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIMEZONE = 'Asia/Kolkata';

const dayjsWithTZ = (date?: dayjs.ConfigType) => {
    return dayjs(date).tz(DEFAULT_TIMEZONE);
};

export default dayjsWithTZ;
