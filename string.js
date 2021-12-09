const crypto = require('crypto');
const { rand } = require('./math');
const { contains } = require('./verify');

const removeSpecialChar = (str, withoutSpace) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(new RegExp(`[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f${withoutSpace ? ' ' : ''}]`, 'gi'), '');
};

const removeNewLine = (str, replaceTo = '') => {
  if (!str || typeof str !== 'string') return null;
  return str.replace(/(\r\n|\n|\r)/gm, replaceTo).trim();
};

const capitalizeFirst = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeEachWords = (str, naturally) => {
  if (!str || typeof str !== 'string' || str.length < 1) return null;
  const splitStr = str.trim().toLowerCase().split(' ');
  for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
    if (!naturally || !contains(splitStr[i], [
      'in', 'on', 'the', 'at', 'and', 'or', 'of', 'for', 'to', 'that',
      'a', 'by', 'it', 'is', 'as', 'are', 'were', 'was', 'nor', 'an',
    ], true)) {
      splitStr[i] = capitalizeFirst(splitStr[i]);
    }
  }
  return capitalizeFirst(splitStr.join(' '));
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
  if (typeof length !== 'number') {
    return null;
  }
  let result = '';
  let newChar;
  const AVAIL_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const AVAIL_CHARACTERS_LENGTH = AVAIL_CHARACTERS.length;
  for (let i = 0; i < length; i += 1) {
    newChar = AVAIL_CHARACTERS.charAt(Math.floor(Math.random() * AVAIL_CHARACTERS_LENGTH));
    newChar = Math.random() < 0.5 ? newChar.toUpperCase() : newChar;
    result += newChar;
  }
  return result;
};

const hideRandom = (str, hideLength = 1, hideStr = '*') => {
  let currentStr = str;
  let hideCount = 0;
  let tempIdx = 0;
  const totalStrLength = currentStr.length;
  let currentStrLength = 0;
  while ((hideCount < hideLength) && (currentStrLength < totalStrLength)) {
    tempIdx = rand(0, totalStrLength);
    if (/[a-zA-Z가-힣]/.test(currentStr.substr(tempIdx, 1))) {
      currentStr = `${currentStr.substr(0, tempIdx)}${hideStr}${currentStr.substr(tempIdx + 1)}`;
      hideCount += 1;
    }
    currentStrLength += 1;
  }
  return currentStr;
};

const truncate = (str, length = 0, ellipsis = '') => {
  let convStr = str;
  if (str.length > length) {
    convStr = str.substring(0, length) + ellipsis;
  }
  return convStr;
};

const encrypt = (str, secret, algorithm = 'aes-256-cbc', ivSize = 16) => {
  const iv = crypto.randomBytes(ivSize);
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  let enc = cipher.update(str);
  enc = Buffer.concat([enc, cipher.final()]);
  return `${iv.toString('hex')}:${enc.toString('hex')}`;
};

const decrypt = (str, secret, algorithm = 'aes-256-cbc') => {
  const arrStr = str.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(arrStr.shift(), 'hex'));
  let decrypted = decipher.update(Buffer.from(arrStr.join(':'), 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const md5 = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) {
    throw new Error('string arguments required');
  }
  return crypto.createHash('md5').update(str).digest('hex');
};

const sha1 = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) {
    throw new Error('string arguments required');
  }
  return crypto.createHash('sha1').update(str).digest('hex');
};

const sha256 = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) {
    throw new Error('string arguments required');
  }
  return crypto.createHash('sha256').update(str).digest('hex');
};

const unique = (str) => {
  if (!str || typeof str !== 'string' || str.length < 1) {
    throw new Error('string arguments required');
  }
  return String.prototype.concat(...new Set(str));
};

module.exports = {
  removeSpecialChar,
  removeNewLine,
  capitalizeFirst,
  capitalizeEachWords,
  count,
  shuffle,
  createRandom,
  hideRandom,
  truncate,
  encrypt,
  decrypt,
  md5,
  sha1,
  sha256,
  unique,
};
