const empty = (data) => {
  if (!data) return true;
  switch (typeof data) {
    default:
      return false;
    case 'string':
      return data.length < 1;
    case 'object':
      if (Array.isArray(data)) {
        return data.length < 1;
      }
      return Object.keys(data).length < 1;
  }
};

const isUrl = (url, withProtocol = false, strict = false) => {
  if (!url || typeof url !== 'string') return false;
  const protocol = (withProtocol && url.indexOf('://') === -1) ? 'https://' : '';
  const temp = () => null;
  if (strict && url.indexOf('.') === -1) return false;
  try {
    temp(new URL(`${protocol}${url}`));
  } catch (e) {
    return false;
  }
  return true;
};

const contains = (str, search) => {
  if (!str || !search || (typeof str !== 'string' && typeof str !== 'object')
      || (typeof str === 'object' && !Array.isArray(str))) return false;
  if (typeof search === 'string') return str.indexOf(search) !== -1;
  const searchLength = search.length;
  for (let i = 0; i < searchLength; i += 1) {
    if (str.indexOf(search[i]) !== -1) return true;
  }
  return false;
};

const is2dArray = (arr) => {
  if (!arr || typeof arr !== 'object' || !Array.isArray(arr)) return false;
  return arr.filter(Array.isArray).length === 2;
};

module.exports = {
  empty,
  isUrl,
  contains,
  is2dArray,
};
