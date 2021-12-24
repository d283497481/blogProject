import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc); // 让 dayjs 支持 utc 格式的转化

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
}

export function formatTime(timeString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs(timeString).format(format);
}
