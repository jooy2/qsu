const moment = require('moment');

const dayDiff = (d1, d2) => {
  const d2a = d2 || new Date();
  let d1ff1 = d1 instanceof Date ? d1 : new Date(d1);
  let d1ff2 = d2a instanceof Date ? d2a : new Date(d2a);
  d1ff1 = new Date(d1ff1.getFullYear(), d1ff1.getMonth() + 1, d1ff1.getDate());
  d1ff2 = new Date(d1ff2.getFullYear(), d1ff2.getMonth() + 1, d1ff2.getDate());
  return Math.ceil(Math.abs(d1ff2.getTime() - d1ff1.getTime()) / (1000 * 3600 * 24));
};

const today = (dateType) => {
  if (dateType !== undefined && typeof dateType !== 'string') {
    return null;
  }
  const format = dateType ? dateType.toUpperCase() : 'YYYY-MM-DD';
  return moment().format(format);
};

const isRealDate = (d) => {
  if (!d || typeof d !== 'string') return false;
  const date = new Date(d);
  if (!date.getTime() || !d.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  return date.toISOString().slice(0, 10) === d;
};

module.exports = {
  dayDiff,
  today,
  isRealDate,
};
