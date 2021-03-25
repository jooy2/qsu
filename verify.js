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

module.exports = {
  empty,
  isUrl,
};
