const sleep = (delay = 0) => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

const takes = (func, noDecimal = false) => {
  try {
    // eslint-disable-next-line global-require
    const { performance } = require('perf_hooks');
    // do stuff
    const s = performance.now();
    if (typeof func !== 'function') return 0;
    func();
    const e = performance.now() - s;
    if (noDecimal) return Math.floor(e);
    return e;
  } catch (e) {
    // eslint-disable-next-line no-throw-literal
    throw 'NodeJS environment is required to run this method.';
  }
};

module.exports = {
  sleep,
  takes,
};
