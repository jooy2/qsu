<div align="center">

![logo](logo.webp)

### Quick & Simple Utility for NodeJS

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/qsu) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/qsu) ![Line Count](https://img.shields.io/tokei/lines/github/jooy2/qsu) [![npm downloads](https://img.shields.io/npm/dm/qsu.svg)](https://www.npmjs.com/package/qsu) [![npm latest package](https://img.shields.io/npm/v/qsu/latest.svg)](https://www.npmjs.com/package/qsu) ![npm maintenance](https://img.shields.io/npms-io/maintenance-score/qsu) ![npm quality](https://img.shields.io/npms-io/quality-score/qsu) ![minified size](https://img.shields.io/bundlephobia/min/qsu) ![github repo size](https://img.shields.io/github/repo-size/jooy2/qsu) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/qsu?style=social)

</div>

**Qsu** is an underscore-based utility library optimized for the **[NodeJS](https://nodejs.org)** development environment. It is supported in one module without the need to separately write frequently used methods for each project.

- Lightweight and fast!
- Easy to install and use.
- 100% optimized for the latest NodeJS and ESM environments.
- Useful features for websites and web applications

# Installation

Qsu requires `Node.js 12.x` or higher, and the repository is serviced through **[NPM](https://npmjs.com)**.

After configuring the node environment, you can simply run the following command.

```bash
# via npm
$ npm install qsu

# via yarn
$ yarn add qsu

# via pnpm
$ pnpm install qsu
```

# How to use

### Using named import (Multiple utilities in a single require) - Recommend

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

### Using whole class (multiple utilities simultaneously with one object)

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```

# Methods

### `_.sleep (Promise:boolean)`

Sleep function using Promise.

- `milliseconds::number`

```javascript
await _.sleep(1000); // 1s

_.sleep(5000).then(() => {
	// continue
});
```

### `_.funcTimes (any[])`

Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.

- `times::number`
- `iteratee::function`

```javascript
function sayHi(str) {
	return `Hi${str || ''}`;
}

_.funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
_.funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

### `_.getPlatform (string)`

Returns the operating system of the currently running process as a human-friendly string.

```javascript
_.getPlatform(); // Returns 'Windows'
```

### `_.numRandom (number)`

Returns a random number (Between min and max).

- `min::number`
- `max::number`

```javascript
_.numRandom(1, 5); // Returns 1~5
_.numRandom(10, 20); // Returns 10~20
```

### `_.sum (number)`

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.sum(1, 2, 3); // Returns 6
_.sum([1, 2, 3, 4]); // Returns 10
```

### `_.mul (number)`

Returns after multiplying all n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.mul(1, 2, 3); // Returns 6
_.mul([1, 2, 3, 4]); // Returns 24
```

### `_.dayDiff (number)`

Calculates the difference between two given dates and returns the number of days.

- `date1::Date`
- `date2::Date?`

```javascript
_.daydiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

### `_.today (string)`

Returns today's date.

- `separator::string = '-'`
- `yearFirst::boolean = false`

```javascript
_.today(); // Returns YYYY-MM-DD
_.today('/'); // Returns YYYY/MM/DD
_.today('/', false); // Returns DD/MM/YYYY
```

### `_.isRealDate (boolean)`

Checks if a given date actually exists. Check only in YYYY-MM-DD format.

- `date::string|Date`

```javascript
_.isRealDate('2021-01-01'); // Returns true
_.isRealDate('2021-02-30'); // Returns false
```

### `_.arrShuffle (any[])`

Shuffle the order of the given array and return.

- `array::any[]`

```javascript
_.arrShuffle([1, 2, 3, 4]); // Returns [4, 2, 3, 1]
```

### `_.arrWithDefault (any[])`

Initialize an array with a default value of a specific length.

- `defaultValue::any`
- `length::number || 0`

```javascript
_.arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
_.arrWithDefault(null, 3); // Returns [null, null, null]
```

### `_.arrWithNumber (number[])`

Creates and returns an Array in the order of start...end values.

- `start::number`
- `end::number`

```javascript
_.arrWithNumber(1, 3); // Returns [1, 2, 3]
_.arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

### `_.arrUnique (any[])`

Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.

- `array::any[]`

```javascript
_.arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
_.arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

### `_.average (number)`

Returns the average of all numeric values in an array.

- `array::number[]`

```javascript
_.average([1, 5, 15, 50]); // Returns 17.75
```

### `_.arrMove (any[])`

Moves the position of a specific element in an array to the specified position. (Position starts from 0.)

- `array::any[]`
- `from::number`
- `to::number`

```javascript
_.arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

### `_.trim (string)`

Removes leading and trailing spaces, and returns a value converted from two or more spaces between strings to one space. If the removeAllSpace value is true, all spaces including one space are removed.

- `str::string`
- `removeAllSpace::boolean`

```javascript
_.trim(' Hello Wor  ld '); // Returns 'Hello World'
_.trim('H e l l o     World', true); // Returns 'HelloWorld'
```

### `_.removeSpecialChar (string)`

Returns after removing all special characters, including spaces.

- `str::string`
- `withoutSpace::boolean`

```javascript
_.removeSpecialChar('Hello, World!'); // Returns 'HelloWorld'
```

### `_.removeNewLine (string)`

Removes `\n`, `\r` characters or replaces them with specified characters.

- `str::string`
- `replaceTo::string || ''`

```javascript
_.removeNewLine('ab\ncd'); // Returns 'abcd'
_.removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

### `_.capitalizeFirst (string)`

Converts the first letter of the entire string to uppercase and returns.

- `str::string`

```javascript
_.capitalizeFirst('abcd'); // Returns 'Abcd'
```

### `_.capitalizeEachWords (string)`

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

- `str::string`
- `natural::boolean || false`

```javascript
_.capitalizeEachWords('abcd'); // Returns 'Abcd'
```

### `_.strCount (number)`

Returns the number of times the second String argument is contained in the first String argument.

- `str::string`
- `search::string`

```javascript
_.strCount('abcabc', 'a'); // Returns 2
```

### `_.strShuffle (string)`

Randomly shuffles the received string and returns it.

- `str::string`

```javascript
_.strShuffle('abcdefg'); // Returns 'bgafced'
```

### `_.strRandom (string)`

Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.

- `length::number`
- `additionalCharacters::string?`

```javascript
_.strRandom(5); // Returns 'CHy2M'
```

### `_.strBlindRandom (string)`

Replace strings at random locations with a specified number of characters (default 1) with characters (default \*).

- `str::string`
- `blindLength::number`
- `blindStr::string || '*'`

```javascript
_.strBlindRandom('hello', 2, '#'); // Returns '#el#o'
```

### `_.truncate (string)`

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

- `str::string`
- `length::number`
- `ellipsis::string || ''`

```javascript
_.truncate('hello', 3); // Returns 'hel'
_.truncate('hello', 2, '...'); // Returns 'he...'
```

### `_.split (string[])`

Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

- `str::string`
- `splitter::string||string[]||...string`

```javascript
_.split('hello% js world', '% '); // Returns ['hello', 'js world']
_.split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

### `_.encrypt (string)`

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`
- `ivSize::number || 16`

```javascript
_.encrypt('test', 'secret-key');
```

### `_.decrypt (string)`

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

```javascript
_.decrypt('61ba43b65fc...', 'secret-key');
```

### `_.md5 (string)`

Converts String data to md5 hash value and returns it.

- `str::string`

```javascript
_.md5('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

### `_.sha1 (string)`

Converts String data to sha1 hash value and returns it.

- `str::string`

```javascript
_.sha1('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

### `_.sha256 (string)`

Converts String data to sha256 hash value and returns it.

- `str::string`

```javascript
_.sha256('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

### `_.encodeBase64 (string)`

Base64-encode the given string.

- `str::string`

```javascript
_.encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

### `_.decodeBase64 (string)`

Decodes an encoded base64 string to a plain string.

- `encodedStr::string`

```javascript
_.decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

### `_.strUnique (string)`

Remove duplicate characters from a given string and output only one.

- `str::string`

```javascript
_.strUnique('aaabbbcc'); // Returns 'abc'
```

### `_.isEqual (boolean)`

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

```javascript
const val1 = 'Left';
const val2 = 1;

_.isEqual('Left', 'Left', val1); // Returns true
_.isEqual(1, [1, '1', 1, val2]); // Returns true
_.isEqual(val1, ['Right', 'Left', 1]); // Returns false
_.isEqual(1, 1, 1, 1); // Returns true
```

### `_.isEqualStrict (boolean)`

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

```javascript
const val1 = 'Left';
const val2 = 1;

_.isEqualStrict('Left', 'Left', val1); // Returns true
_.isEqualStrict(1, [1, '1', 1, val2]); // Returns false
_.isEqualStrict(1, 1, '1', 1); // Returns false
```

### `_.isEmpty (boolean)`

Returns true if the passed data is empty or has a length of 0.

- `data::any?`

```javascript
_.isEmpty([]); // Returns true
_.isEmpty(''); // Returns true
_.isEmpty('abc'); // Returns false
```

### `_.isUrl (boolean)`

Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

- `url::string`
- `withProtocol::boolean || false`
- `strict::boolean || false`

```javascript
_.isUrl('google.com'); // Returns false
_.isUrl('google.com', true); // Returns true
_.isUrl('https://google.com'); // Returns true
```

### `_.contains (boolean)`

Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.

- `str::any[]|string`
- `search::any[]|string`
- `exact::boolean || false`

```javascript
_.contains('abc', 'a'); // Returns true
_.contains('abc', 'd'); // Returns false
_.contains('abc', ['a', 'd']); // Returns true
```

### `_.is2dArray (boolean)`

Returns `true` if the given array is a two-dimensional array.

- `array::any[]`

```javascript
_.is2dArray([1]); // Returns false
_.is2dArray([[1], [2]]); // Returns true
```

### `_.between (boolean)`

Returns `true` if the first argument is in the range of the second argument (`[min, max]`). To allow the minimum and maximum values to be in the range, pass `true` for the third argument.

- `range::[number, number]`
- `number::number`
- `inclusive::boolean || false`

```javascript
_.between([10, 20], 10); // Returns false
_.between([10, 20], 10, true); // Returns true
```

### `_.len (number)`

Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.

- `data::any`

```javascript
_.len('12345'); // Returns 5
_.len([1, 2, 3]); // Returns 3
```

### `_.isBotAgent (boolean)`

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

- `userAgent::string`

```javascript
_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

### `_.numberFormat (string)`

Return number format including comma symbol.

- `number::number`

```javascript
_.numberFormat(1234567); // Returns 1,234,567
```

### `_.fileName (string)`

Extract the file name from the path. Include the extension if withExtension is `true`.

- `filePath::string`
- `withExtension::boolean || false`

```javascript
_.fileName('C:Temphello.txt'); // Returns 'hello.txt'
_.fileName('C:Temp\file.mp3', true); // Returns 'file.mp3'
```

### `_.fileSize (string)`

Converts the file size in bytes to human-readable and returns it. The return value is a String and includes the file units (Bytes, MB, GB...). If the second optional argument value is included, you can display as many decimal places as you like.

- `bytes::number`
- `decimals::number || 2`

```javascript
_.fileSize(2000, 3); // Returns '1.953 KB'
_.fileSize(250000000); // Returns '238.42 MB'
```

### `_.fileExt (string)`

Returns only the extensions in the file path. If unknown, returns 'Unknown'.

- `filePath::string`

```javascript
_.fileExt('C:Temphello.txt'); // Returns 'txt'
_.fileExt('this-is-file.mp3'); // Returns 'mp3'
```

### `_.msToTime (string)`

Converts milliseconds to hours, minutes, seconds, and milliseconds and returns. If the second argument is true, milliseconds are also printed. You can put any separator (String) between hours, minutes, and seconds in the third argument.

- `milliseconds::number`
- `withMilliseconds::boolean || false`
- `separator::string || ':'`

```javascript
_.msToTime(100000); // 'Returns '00:01:40'
_.msToTime(100000, true, '-'); // Returns '00-01-40.0'
```

### `_.secToTime (string)`

Converts seconds to hours, minutes, seconds and returns. You can put any separator (String) between hours, minutes, and seconds in the third argument.

- `seconds::number`
- `onlyHour::boolean || false`
- `separator::string || ':'`

```javascript
_.secToTime(3800); // Returns '01:03:20'
_.secToTime(60, '-'); // Returns '00-01-00'
```

### `_.license (string)`

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

```javascript
_.license({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```

# Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/qsu/issues). You can also request a pull to fix bugs and add frequently used features.

# License

Copyright © 2021-2022 Jooy2 Released under the MIT license.
