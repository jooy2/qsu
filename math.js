const rand = (min, max) => {
  if (!min && !max) return (Math.random() > 0.5) ? 1 : 0;
  const limit = !max ? min : max;
  const offset = (!max || min >= max) ? null : min;
  return Math.floor(Math.random() * (offset ? (limit - offset + 1) : limit + 1)) + (offset || 0);
};

const add = (...args) => {
  const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
  if (val.length < 1) throw new Error('Invalid argument format!');
  let total = 0;
  for (let i = 0, iLen = val.length; i < iLen; i += 1) {
    if (typeof val[i] === 'number') total += val[i];
  }
  return total;
};

const mul = (...args) => {
  const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
  if (val.length < 1) throw new Error('Invalid argument format!');
  let total = val[0];
  for (let i = 1, iLen = val.length; i < iLen; i += 1) {
    if (typeof val[i] === 'number') total *= val[i];
  }
  return total;
};

module.exports = {
  rand,
  add,
  mul,
};
