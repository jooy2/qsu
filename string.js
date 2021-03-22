const removeSpecialChar = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/gi, '');
};

module.exports = {
  removeSpecialChar,
};
