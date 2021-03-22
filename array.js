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

module.exports = {
  shuffle,
  setWithDefault,
};
