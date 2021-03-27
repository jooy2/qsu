const removeSpecialChar = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/gi, '');
};

const removeNewLine = (str, replaceTo = '') => {
  if (!str || typeof str !== 'string') return null;
  return str.replace(/(\r\n|\n|\r)/gm, replaceTo).trim();
};

const capitalizeFirst = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = {
  removeSpecialChar,
  removeNewLine,
  capitalizeFirst,
};
