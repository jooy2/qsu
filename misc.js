const sleep = (delay = 0) => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

const nothing = (args) => {
  if (args && typeof args === 'function') { args(); }
};

module.exports = {
  sleep,
  nothing,
};
