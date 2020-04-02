// const now = () => format(Date.now(), 'yyyy-MM-dd HH:mm');
// const now = () => new Date().toISOString();

export const formatDate = (date, seconds = false) =>
  date ? date.slice(0, seconds ? 19 : 16).replace('T', ' ') : '';

const { formatToTimeZone } = require('date-fns-timezone');

export const localeDate = (utcDate, seconds = false) =>
  utcDate
    ? formatToTimeZone(utcDate, `YYYY-MM-DD HH:mm${seconds ? ':ss' : ''}`, {
        timeZone: 'Europe/Stockholm',
      })
    : '';

export const picProps = (object, propList = []) =>
  propList.reduce((acc, prop) => {
    acc[prop] = object[prop];
    return acc;
  }, {});

export const formatJSON = json => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (error) {
    return '';
  }
};
