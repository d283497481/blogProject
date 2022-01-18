const PaddingBytes = (n) => (n <= 9 ? `0${n}` : n);

const Dates = new Date(),
  Year = Dates.getFullYear(), // 年
  Month = Dates.getMonth() + 1, // 月
  strDate = PaddingBytes(Dates.getDate()), // 日
  hour = PaddingBytes(Dates.getHours()), // 时
  minute = PaddingBytes(Dates.getMinutes()), // 分
  second = PaddingBytes(Dates.getSeconds()), // 秒
  time = Dates.getTime(), // 时间戳
  Day = Dates.getDay(); // 周几

export const getData = (slice?: string): string => {
  const currentdate = `${Year}-${Month}-${strDate}`,
    current = `${hour}:${minute}:${second}`;

  return slice === 'date'
    ? currentdate
    : slice === 'tiem'
    ? current
    : `${currentdate} ${current}`;
};
