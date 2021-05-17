const number = (v) => new Intl.NumberFormat().format(v);

const fileSize = (bytes, decimals = 2) => {
  if (bytes === null || typeof bytes !== 'number' || typeof decimals !== 'number') return 'Unknown';
  if (bytes === 0 || bytes < 0) return '0 Bytes';
  const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** byteCalc).toFixed((decimals < 0 ? 0 : decimals)))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]}`;
};

const msToTime = (milliseconds = 0, withMilliseconds = false, separator = ':') => {
  if (!milliseconds || typeof milliseconds !== 'number' || typeof separator !== 'string') return 'Unknown';
  const ms = Math.floor((milliseconds % 1000) / 100);
  let sec = Math.floor((milliseconds / 1000) % 60);
  let min = Math.floor((milliseconds / (1000 * 60)) % 60);
  let hour = Math.floor(milliseconds / (1000 * 60 * 60));
  hour = (hour < 10) ? `0${hour}` : hour;
  min = (min < 10) ? `0${min}` : min;
  sec = (sec < 10) ? `0${sec}` : sec;
  return `${hour}${separator}${min}${separator}${sec}${withMilliseconds ? `.${ms}` : ''}`;
};

const secToTime = (seconds = 0, separator = ':') => {
  if (!seconds || typeof seconds !== 'number' || typeof separator !== 'string') return 'Unknown';
  let sec = Math.floor(seconds % 60);
  let min = Math.floor((seconds / 60) % 60);
  let hour = Math.floor(seconds / (60 * 60));
  hour = (hour < 10) ? `0${hour}` : hour;
  min = (min < 10) ? `0${min}` : min;
  sec = (sec < 10) ? `0${sec}` : sec;
  console.log(`${hour}${separator}${min}${separator}${sec}`);
  return `${hour}${separator}${min}${separator}${sec}`;
};

module.exports = {
  number,
  fileSize,
  msToTime,
  secToTime,
};
