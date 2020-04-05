import { utcToZonedTime, format } from 'date-fns-tz';

export const formatDate = (
  utcDate,
  pattern = 'yyyy-MM-dd HH:mm:ss',
  timeZone = 'Europe/Stockholm'
) => {
  if (!utcDate) {
    return '';
  }

  const zonedDate = utcToZonedTime(utcDate, timeZone);
  return format(zonedDate, pattern, { timeZone });
};

export const picProps = (object, propList = []) =>
  propList.reduce((acc, prop) => {
    acc[prop] = object[prop];
    return acc;
  }, {});

export const formatJSON = (json) => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (error) {
    return '';
  }
};
