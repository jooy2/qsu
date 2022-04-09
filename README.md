<div align="center">

![logo](qsu-logo.png)
### Node.js Quick & Simple Utility for JavaScript

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/master/LICENSE)
![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/qsu)
[![npm latest package](https://img.shields.io/npm/v/qsu/latest.svg)](https://www.npmjs.com/package/qsu)
![minified size](https://img.shields.io/bundlephobia/min/qsu)
![github repo size](https://img.shields.io/github/repo-size/jooy2/qsu)
[![npm downloads](https://img.shields.io/npm/dm/qsu.svg)](https://www.npmjs.com/package/qsu)
[![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2)
</div>

A collection of complex or useful features that are often used in JavaScript. It is implemented to be used in both a client or server environment.

qsu is optimized for modern development environments, so older browsers such as Internet Explorer 11 and Legacy Edge (Not Chromium) may not support it unless you use a transcompiler. Some functions use ES6 or higher JS standard syntax.

Some solutions partially referenced external documentation (e.g. [Stack Overflow](https://stackoverflow.com)).

# Installation
Qsu requires Node.js 12.x or higher, and the repository is serviced through NPM.
After configuring the node environment, you can simply run the following command.
```bash
$ npm i --save qsu
```

# Usage
### Using multiple utilities simultaneously with one object
```javascript
const _ = require('qsu');

function main () {
    console.log(_.date.today()); // '20xx-xx-xx'
}
```

### Using multiple utilities in a single require
```javascript
const { date, format } = require('qsu');

function main () {
    console.log(date.today()); // '20xx-xx-xx'
    console.log(format.number('1234')); // '1,234'
}
```

### To use only one utility, import and use only the necessary parts as follows.
```javascript
const _ = require('qsu/date'); // or require('qsu').date 

function main () {
    return _.today(); // '20xx-xx-xx'
}
```
OR
```javascript
const { today } = require('qsu/date'); // or require('qsu').date 

function main () {
    return today(); // '20xx-xx-xx'
}
```

# Reference
```
qsu.{{Util}}.{{Method}}({{Params1}}, {{Params2}})
```

## qsu.array
Utility to help process array type data.

| Method          | Params | Description                                                                                                                             | Example                                                                                                        |
|-----------------| --- |-----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| .shuffle        | array **{Array}** | Shuffle the order of the given array and return                                                                                         | `shuffle([1, 2, 3, 4]) // [4, 2, 3, 1]...`                                                                     |
| .setWithDefault | <li>defaultValue **{Any}**</li><li>arrayLength **{Number&#124;null}**</li> | Initialize an array with a default value of a specific length.                                                                          | `setWithDefault('abc', 4) // ['abc', 'abc', 'abc', 'abc']`<br/>`setWithDefault(null, 3) // [null, null, null]` |
| .unique         | array **{Array}** | Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed. | `unique([1, 2, 2, 3]) // [1, 2, 3]`<br/>`unique([[1], [1], [2]) // [[1], [2]]`                                 |
| .setWithNumber  | <li>start **{Number}**</li><li>end **{Number}**</li> | Creates and returns an Array in the order of start...end values.                                                                        | `setWithNumber(1, 3) // [1, 2, 3]`<br/>`setWithNumber(0, 3) // [0, 1, 2, 3]`                                   |
| .average        | <li>array **{Array}**</li> | Returns the average of all numeric values in an array.                                                                                  | `average([1, 5, 15, 50]) // 17.75`                                                                             |
| .move           | <li>array **{Array}**</li> | Moves the position of a specific element in an array to the specified position. (Position starts from 0.)                                                        | `move([1, 2, 3, 4], 1, 0) // [2, 1, 3, 4]`                                                                     |

## qsu.string
Utility to help process string type data.

| Method | Params                                                                                                                               | Description | Example                                                                                |
| --- |--------------------------------------------------------------------------------------------------------------------------------------| --- |----------------------------------------------------------------------------------------|
| .removeSpecialChar | <li>string **{String}**</li><li>withoutSpace **{Boolean}**</li>                                                                      | Returns after removing all special characters, including spaces. | `removeSpecialChar('Hello, World!') // 'HelloWorld'`                                   |
| .removeNewLine | string **{String}**                                                                                                                  | Removes \n, \r characters or replaces them with specified characters. | `removeNewLine('ab\ncd') // 'abcd'`<br/>`removeNewLine('ab\r\ncd', '-') // 'ab-cd'`    |
| .capitalizeFirst | string **{String}**                                                                                                                  | Converts the first letter of the entire string to uppercase and returns. | `capitalizeFirst('abcd') // 'Abcd'`                                                    |
| .capitalizeEachWords | <li>string **{String}**</li><li>naturally **{Boolean}**</li> | Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase. | `capitalizeEachWords('hello world') // 'Hello World'`                                  |
| .count | <li>string **{String}**</li><li>search **{String}**</li>                                                                             | Returns the number of times the second String character is contained in the first String argument. | `count('abcabc', 'a') // 2`                                                            |
| .shuffle | <li>string **{String}**</li>                                                                                                         | Randomly shuffles the received string and returns it. | `shuffle('abcdefg') // 'bgafced'`                                                      |
| .createRandom | <li>length **{Number}**</li>                                                                                                         | Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12. | `createRandom(5) // 'CHy2M'`                                                           |
| .hideRandom | <li>str **{String}**</li><li>hideLength **{Number}**</li><li>hideStr **{String}**</li>                                               | Replaces strings at random locations with a specified number of characters (default 1) with characters (default *). | `hideRandom('hello', 2, '#') // '#el#o'`                                               |
| .truncate | <li>str **{String}**</li><li>length **{Number}**</li><li>ellipsis **{String&#124;null}**</li>                                        | Truncates a long string to a specified length, optionally appending an ellipsis after the string. | `truncate('hello', 3) // 'hel'`<br/>`truncate('hello', 2, '...') // 'he...'`           |
| .encrypt | <li>str **{String}**</li><li>secret **{String}**</li><li>algorithm **{String&#124;null}**</li><li>ivSize **{Number&#124;null}**</li> | Encrypt with the algorithm of your choice (algorithm default: aes-256-cbc, ivSize default: 16) using a string and a secret (secret). | `encrypt('test', 'secret-key')`                                                        |
| .decrypt | <li>str **{String}**</li><li>secret **{String}**</li><li>algorithm **{String&#124;null}**</li>                                       | Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret). | `decrypt('61ba43b65fc...', 'secret-key') // 'test'`                                    |
| .md5 | <li>str **{String}**</li>                                                                                                            | Converts String data to md5 hash value and returns it. | `md5('test') // '098f6bcd4621d373cade4e832627b4f6'`                                    |
| .sha1 | <li>str **{String}**</li>                                                                                                            | Converts String data to sha1 hash value and returns it. | `sha1('test') // 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'`                           |
| .sha256 | <li>str **{String}**</li>                                                                                                            | Converts String data to sha256 hash value and returns it. | `sha256('test') // '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'` |
| .unique | <li>str **{String}**</li>                                                                                                            | Remove duplicate characters from a given string and output only one. | `unique('aaabbbcc') // 'abc'`                                                          |

## qsu.math
Utility for arithmetic on numbers.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .rand | <li>min **{Number&#124;null}**</li><li>max **{Number&#124;null}**</li> | Returns a random number (0 to max or between min and max). | `rand() // 0-1`<br/>`rand(10) // 0~10`<br/>`rand(10, 20) // 10~20` |
| .add | <li>...numbers **{Number&#124;Array}**</li> | Returns after adding up all the n arguments of numbers or the values of a single array of numbers. | `add(1, 2, 3) // 6`<br/>`add([1, 2, 3, 4]) // 10` |
| .mul | <li>...numbers **{Number&#124;Array}**</li> | Returns after multiplying all n arguments of numbers or the values of a single array of numbers. | `mul(1, 2, 3) // 6`<br/>`mul([1, 2, 3, 4]) // 24` |

## qsu.verify
Utility for data inspection.

| Method | Params                                                                                                          | Description                                                                                                                                                                                                              | Example |
| --- |-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |
| .empty | data **{Any}**                                                                                                  | Returns true if the passed data is empty or has a length of 0.                                                                                                                                                           | `empty([]) // true`<br/>`empty('') // true`<br/>`empty('abc') // false` |
| .isUrl | <li>url **{String}**</li><li>withProtocol **{Boolean&#124;null}**</li><li>strict **{Boolean&#124;null}**</li>   | Returns true if the given data is in the correct URL format. If withProtocol is true, it is automatically appended to the URL when the protocol does not exist. If strict is true, URLs without commas (.) return false. | `isUrl('google.com') // false`<br/>`isUrl('google.com', true) // true`<br/>`isUrl('https://google.com') // true` |
| .contains | <li>string **{String}**</li><li>searchData **{Array&#124;String}**</li><li>exact **{Boolean}**</li> | Returns true if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is true, it returns true only for an exact match. | `contains('abc', 'a') // true`<br/>`contains('abc', 'd') // false`<br/>`contains('abc', ['a', 'd']) // true` |
| .is2dArray | array **{Array}**                                                                                               | Returns true if the given array is a two-dimensional array.                                                                                                                                                              | `is2dArray([1]) // false`<br/>`is2dArray([[1], [2]) // true` |
| .between | <li>value **{Number}**</li><li>range **{[min, max]}</li><li>inclusive **{Boolean&#124;null}**</li>**            | Returns true if the first argument is in the range of the second argument ([min, max]). To allow the minimum and maximum values to be in the range, pass true for the third argument.                                    | `between(10, [10, 20]) // false`<br/>`between(10, [10, 20], true) // true` |
| .length | <li>data **{Any}**</li>                                                                                         | Returns the length of any type of data. If the argument value is null or undefined, 0 is returned.                                                                                                                       | `length('12345') // 5`<br/>`length([1, 2, 3]]) // 3` |
| .isBotAgent | <li>userAgent **{String}**</li>                                                                                 | Analyze the user agent value to determine if it's a bot for a search engine. Returns true if it's a bot.                                                                                                                 | `isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)') // true` |

## qsu.format
Utility that converts to Human-Readable String format.

| Method | Params                                                                                                                                                                                                                                            | Description | Example |
| --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
| .number | val **{String&#124;Number}**                                                                                                                                                                                                                      | Return in number format including comma symbol. | `number(1234567) // 1,234,567` |
| .fileName | <li>filePath **{String}**</li><li>withExtension **{Boolean}**</li>                                                                                                                                                                                | Extract the file name from the path. Include the extension if withExtension is true. | `fileName('C:\Temp\hello.txt') // 'hello.txt'`<br/>`fileName('C:\Temp\file.mp3', true) // 'file.mp3'` |
| .fileSize | <li>bytes **{Number}**</li><li>decimals **{Number}**</li>                                                                                                                                                                                         | Converts the file size in bytes to human-readable and returns it. The return value is a String and includes the file units (Bytes, MB, GB...). If the second optional argument value is included, you can display as many decimal places as you like. | `fileSize(2000, 3) // '1.953 KB'`<br/>`fileSize(250000000) // '238.42 MB'` |
| .fileExt | <li>filePath **{String}**</li>                                                                                                                                                                                                                    | Returns only the extensions in the file path. If unknown, returns 'Unknown'. | `fileExt('C:\Temp\hello.txt') // 'txt'`<br/>`fileExt('this-is-file.mp3') // 'mp3'` |
| .msToTime | <li>milliseconds **{Number}**</li><li>withMilliseconds **{Boolean}**</li><li>separator **{String}**</li>                                                                                                                                          | Converts milliseconds to hours, minutes, seconds, and milliseconds and returns. If the second argument is true, milliseconds are also printed. You can put any separator (String) between hours, minutes, and seconds in the third argument. | `msToTime(100000) // '00:01:40'`<br/>`msToTime(100000, true, '-') // '00-01-40.0'` |
| .secToTime | <li>seconds **{Number}**</li><li>separator **{String}**</li><li>onlyHour **{Boolean}**</li>                                                                                                                                                       | Converts seconds to hours, minutes, seconds and returns. You can put any separator (String) between hours, minutes, and seconds in the third argument. | `secToTime(3800) // '01:03:20'`<br/>`secToTime(60, '-') // '00-01-00'` |
| .license | <li>type(Required, Currently 'apache20', 'mit' is supported) **{String}**</li><li>author(Required) **{String}**</li><li>yearStart(Required) **{String}**</li><li>yearEnd **{String}**</li><li>email **{string}**</li><li>htmlBr **{string}**</li> | Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type. | `license({ holder: 'example', email: 'example@example.com', yearStart: 2020, yearEnd: 2021, htmlBr: true })` |

## qsu.date
Utility to simplify date format printing or calculation.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .dayDiff | <li>date1 **{String&#124;Date}**</li><li>date2 **{String&#124;Date&#124;null}**</li> | Calculates the difference between two given dates and returns the number of days. | `daydiff('2021-01-01', '2021-01-03') // 2` |
| .today | dateFormat **{String}** | Returns today's date. | `today('YYYY-MM-DD') // 2021-01-01` |
| .convertDate | <li>dateString **{String}**</li><li>dateFormat **{String}** | Returns a date in YYYY-MM-DD or desired format based on the first argument (date in String format). | `convertDate('2021-01-01', 'YYYY') // 2021`<br/>`convertDate('2021', 'YYYY_MM_DD') // 2021_01_01` |
| .isRealDate | dateString (YYYY-MM-DD) **{String}** | Checks if a given date actually exists. Check only in YYYY-MM-DD format. | `isRealDate('2021-01-01') // true`<br/>`isRealDate('2021-02-30') // false` |

## qsu.misc
Various utilities that help with convenience codes or complex operations.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .sleep | milliseconds **{Number}** | Sleep function using Promise. | `await sleep(1000) // 1s`<br/>`sleep(5000).then(() => { ... })` |

# Contribute
You can report issues on GitHub Issue. You can also request a pull to fix bugs and add frequently used features.

# License
Copyright © 2021 Jooy2 Released under the MIT license.
