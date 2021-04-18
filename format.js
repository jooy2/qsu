const number = (v) => new Intl.NumberFormat().format(v);

const fileSize = (bytes, decimals = 2) => {
  if (bytes === null || typeof bytes !== 'number' || typeof decimals !== 'number') return 'Unknown';
  if (bytes === 0 || bytes < 0) return '0 Bytes';
  const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** byteCalc).toFixed((decimals < 0 ? 0 : decimals)))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]}`;
};

module.exports = {
  number,
  fileSize,
};
