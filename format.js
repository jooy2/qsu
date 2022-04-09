const path = require('path');

const number = (v) => new Intl.NumberFormat().format(v);

const fileName = (filePath, withExtension) => {
  if (!filePath || typeof filePath !== 'string' || filePath.length < 1) {
    throw new Error('Unknown file path');
  }
  if (withExtension) {
    return path.basename(filePath);
  }
  return path.basename(filePath, path.extname(filePath));
};

const fileSize = (bytes, decimals = 2) => {
  if (bytes === null || typeof bytes !== 'number' || typeof decimals !== 'number') return 'Unknown';
  if (bytes === 0 || bytes < 0) return '0 Bytes';
  const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** byteCalc).toFixed((decimals < 0 ? 0 : decimals)))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]}`;
};

const fileExt = (filePath) => {
  if (!filePath || typeof filePath !== 'string' || filePath.indexOf('.') === -1) return 'Unknown';
  const p = filePath.trim().toLowerCase();
  const pSpl = p.split('.');
  return pSpl.length > 0 ? pSpl[pSpl.length - 1] : 'Unknown';
};

const msToTime = (milliseconds = 0, withMilliseconds = false, separator = ':') => {
  if (!milliseconds || typeof milliseconds !== 'number' || typeof separator !== 'string') return 'Unknown';
  const ms = Math.floor((milliseconds % 1000) / 100);
  let sec = Math.floor((milliseconds / 1000) % 60);
  let min = Math.floor((milliseconds / (1000 * 60)) % 60);
  let hour = Math.floor(milliseconds / (1000 * 60 * 60));
  hour = (hour < 10) ? `0${hour}` : hour;
  min = (min < 10) ? `0${min}` : min;
  sec = (sec < 10) ? `0${sec}` : sec;
  return `${hour}${separator}${min}${separator}${sec}${withMilliseconds ? `.${ms}` : ''}`;
};

const secToTime = (seconds = 0, separator = ':', onlyHour = false) => {
  if (!seconds || typeof seconds !== 'number' || typeof separator !== 'string') return 'Unknown';
  let sec = Math.floor(seconds % 60);
  let min = Math.floor((seconds / 60) % 60);
  let hour = Math.floor(seconds / (60 * 60));
  hour = (hour < 10) ? `0${hour}` : hour;
  min = (min < 10) ? `0${min}` : min;
  sec = (sec < 10) ? `0${sec}` : sec;
  return onlyHour ? hour : `${hour}${separator}${min}${separator}${sec}`;
};

const license = (args = {}) => {
  if (typeof args !== 'object' || args.length < 1) {
    throw new Error('An argument of type Object is required. Please refer to README.md.');
  }
  if (!args.author || !args.yearStart) {
    throw new Error('holder and startYear are required.');
  }
  const br = args.htmlBr ? '<br/>' : '\n';
  const type = args?.type?.replace(/\./g, '').toLowerCase() || 'mit';
  const yearString = `${args.yearStart}${args.yearEnd ? `-${args.yearEnd}` : ''}`;
  const authorString = `${args.author}${args.email ? ` <${args.email}>` : ''}`;
  switch (type) {
    case 'apache20':
      return `Copyright ${yearString} ${authorString}${br}${br}Licensed under the Apache License, Version 2.0 (the "License");${br}you may not use this file except in compliance with the License.${br}You may obtain a copy of the License at${br}${br}    http://www.apache.org/licenses/LICENSE-2.0${br}${br}Unless required by applicable law or agreed to in writing, software${br}distributed under the License is distributed on an "AS IS" BASIS,${br}WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.${br}See the License for the specific language governing permissions and${br}limitations under the License.`;
    case 'mit':
    default:
      return `Copyright (c) ${yearString} ${authorString}${br}${br}Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:${br}${br}The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.${br}${br}THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
  }
};

module.exports = {
  number,
  fileName,
  fileSize,
  fileExt,
  msToTime,
  secToTime,
  license,
};
