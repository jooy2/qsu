const { is2dArray } = require('./verify');

const shuffle = (arr) => {
  if (!arr || typeof arr !== 'object' || arr.length < 1) return null;
  if (arr.length === 1) return arr[0];
  const newArr = arr;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [arr[j], arr[i]];
  }
  return newArr;
};

const setWithDefault = (value = null, length = 1) => {
  if (length < 1) return [];
  return Array(length).fill(value);
};

const unique = (arr) => {
  if (!arr || typeof arr !== 'object' || arr.length < 1) return null;
  if (is2dArray(arr)) {
    return arr.map(JSON.stringify)
      .reverse()
      .filter((e, i, a) => a.indexOf(e, i + 1) === -1)
      .reverse()
      .map(JSON.parse);
  }
  return [...new Set(arr)];
};

const setWithNumber = (start, end) => {
  if (start === null || end === null || start > end) return null;
  return Array.from({ length: (end - start) + 1 }, (_, i) => i + start);
};

const average = (arr) => {
  if (!arr) return null;
  return arr.reduce((p, c) => p + c, 0) / arr.length;
};

module.exports = {
  shuffle,
  setWithDefault,
  unique,
  setWithNumber,
  average,
};
