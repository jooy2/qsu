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

module.exports = {
  empty,
};
