const { performance } = require('perf_hooks');

const sleep = (delay = 0) => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

const takes = (func, noDecimal = false) => {
  const s = performance.now();
  if (typeof func !== 'function') return 0;
  func();
  const e = performance.now() - s;
  if (noDecimal) return Math.floor(e);
  return e;
};

module.exports = {
  sleep,
  takes,
};
