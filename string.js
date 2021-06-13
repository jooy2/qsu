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

const count = (str, search) => {
  if (!str || typeof str !== 'string' || !search || typeof search !== 'string') return 0;
  return (str.match(new RegExp(search, 'g')) || []).length;
};

const shuffle = (str) => {
  if (!str || typeof str !== 'string') return null;
  return [...str].sort(() => Math.random() - 0.5).join('');
};

const createRandom = (length = 12) => {
  if (typeof length !== 'number') return null;
  return Math.random().toString(36).substr(2, length).split('')
    .map(c => (Math.random() < 0.5 ? c.toUpperCase() : c))
    .join('');
};

module.exports = {
  removeSpecialChar,
  removeNewLine,
  capitalizeFirst,
  count,
  shuffle,
  createRandom,
};
