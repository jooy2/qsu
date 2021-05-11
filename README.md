# 🧰 QSU
Quick and Simple Utility for JavaScript (NodeJS)

A collection of complex or useful features that are often used in JavaScript. It is implemented to be used in both a client or server environment.

qsu is optimized for modern development environments, so older browsers such as Internet Explorer 11 and Legacy Edge (Not Chromium) may not support it unless you use a transcompiler. Some functions use ES6 or higher JS standard syntax.

# Installation
Qsu requires Node.js 10.x or higher, and the repository is serviced through NPM.
After configuring the node environment, you can simply run the following command.
```javascript
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
```javascript
qsu.{{Util}}.{{Method}}({{Params1}}, {{Params2}})
```

## qsu.array
Utility to help process array type data.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .shuffle | array **{Array}** | Shuffle the order of the given array and return | `shuffle([1, 2, 3, 4]) // [4, 2, 3, 1]...` |
| .setWithDefault | <li>defaultValue **{Any}**</li><li>arrayLength **{Number&#124;null}**</li> | Initialize an array with a default value of a specific length. | `setWithDefault('abc', 4) // ['abc', 'abc', 'abc', 'abc']`<br/>`setWithDefault(null, 3) // [null, null, null]` |
| .unique | array **{Array}** | Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed. | `unique([1, 2, 2, 3]) // [1, 2, 3]`<br/>`unique([[1], [1], [2]) // [[1], [2]]` |
| .setWithNumber | <li>start **{Number}**</li><li>end **{Number}**</li> | Creates and returns an Array in the order of start...end values. | `setWithNumber(1, 3) // [1, 2, 3]`<br/>`setWithNumber(0, 3) // [0, 1, 2, 3]` |

## qsu.string
Utility to help process string type data.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .removeSpecialChar | string **{String}** | Returns after removing all special characters, including spaces. | `removeSpecialChar('Hello, World!') // 'HelloWorld'` |
| .removeNewLine | string **{String}** | Removes \n, \r characters or replaces them with specified characters. | `removeNewLine('ab\ncd') // 'abcd'`<br/>`removeNewLine('ab\r\ncd', '-') // 'ab-cd'` |
| .capitalizeFirst | string **{String}** | Converts the first letter of the entire string to uppercase and returns. | `capitalizeFirst('abcd') // 'Abcd'` |
| .count | <li>string **{String}**</li><li>search **{String}**</li> | Returns the number of times the second String character is contained in the first String argument. | `count('abcabc', 'a') // 2` |

## qsu.math
Utility for arithmetic on numbers.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .rand | <li>min **{Number&#124;null}**</li><li>max **{Number&#124;null}**</li> | Returns a random number (0 to max or between min and max). | `rand() // 0-1`<br/>`rand(10) // 0~10`<br/>`rand(10, 20) // 10~20` |
| .add | <li>...numbers **{Number&#124;Array}**</li> | Returns after adding up all the n arguments of numbers or the values of a single array of numbers. | `add(1, 2, 3) // 6`<br/>`add([1, 2, 3, 4]) // 10` |
| .mul | <li>...numbers **{Number&#124;Array}**</li> | Returns after multiplying all n arguments of numbers or the values of a single array of numbers. | `mul(1, 2, 3) // 6`<br/>`mul([1, 2, 3, 4]) // 24` |

## qsu.verify
Utility for data inspection.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .empty | data **{Any}** | Returns true if the passed data is empty or has a length of 0. | `empty([]) // true`<br/>`empty('') // true`<br/>`empty('abc') // false` |
| .isUrl | <li>url **{String}**</li><li>withProtocol **{Boolean&#124;null}**</li><li>strict **{Boolean&#124;null}**</li> | Returns true if the given data is in the correct URL format. If withProtocol is true, it is automatically appended to the URL when the protocol does not exist. If strict is true, URLs without commas (.) return false. | `isUrl('google.com') // false`<br/>`isUrl('google.com', true) // true`<br/>`isUrl('https://google.com') // true` |
| .contains | <li>string **{String}**</li><li>searchData **{Array&#124;String}** | Returns true if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". | `contains('abc', 'a') // true`<br/>`contains('abc', 'd') // false`<br/>`contains('abc', ['a', 'd']) // true` |
| .is2dArray | array **{Array}** | Returns true if the given array is a two-dimensional array. | `is2dArray([1]) // false`<br/>`is2dArray([[1], [2]) // true` |
| .between | <li>value **{Number}**</li><li>range **{[min, max]}</li><li>inclusive **{Boolean&#124;null}**</li>** | Returns true if the first argument is in the range of the second argument ([min, max]). To allow the minimum and maximum values to be in the range, pass true for the third argument. | `between(10, [10, 20]) // false`<br/>`between(10, [10, 20], true) // true` |

## qsu.format
Utility that converts to Human-Readable String format.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .number | val **{String&#124;Number}** | Return in number format including comma symbol. | `number(1234567) // 1,234,567` |
| .fileSize | <li>bytes **{Number}**</li><li>decimals **{Number}**</li> | Converts the file size in bytes to human-readable and returns it. The return value is a String and includes the file units (Bytes, MB, GB...). If the second optional argument value is included, you can display as many decimal places as you like. | `fileSize(2000, 3) // '1.953 KB'`<br/>`fileSize(250000000) // '238.42 MB'` |
| .msToTime | <li>milliseconds **{Number}**</li><li>withMilliseconds **{Boolean}**</li><li>separator **{String}**</li> | Converts milliseconds to hours, minutes, seconds, and milliseconds and returns. If the second argument is true, milliseconds are also printed. You can put any separator (String) between hours, minutes, and seconds in the third argument. | `msToTime(100000) // '00:01:40'`<br/>`msToTime(100000, true, '-') // '00-01-40.0'` |

## qsu.date
Utility to simplify date format printing or calculation.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .dayDiff | <li>date1 **{String&#124;Date}**</li><li>date2 **{String&#124;Date&#124;null}**</li> | Calculates the difference between two given dates and returns the number of days. | `daydiff('2021-01-01', '2021-01-03') // 2` |
| .today | format **{'YYYY-MM-DD'&#124;null}** | Returns today's date. | `today('YYYY-MM-DD') // 2021-01-01` |
| .isRealDate | dateString (YYYY-MM-DD) **{String}** | Checks if a given date actually exists. Check only in YYYY-MM-DD format. | `isRealDate('2021-01-01') // true`<br/>`isRealDate('2021-02-30') // false` |

## qsu.misc
Various utilities that help with convenience codes or complex operations.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .sleep | milliseconds **{Number}** | Sleep function using Promise. | `await sleep(1000) // 1s`<br/>`sleep(5000).then(() => { ... })` |

# Contribute
You can report issues on Github Issue. You can also request a pull to fix bugs and add frequently used features.

# License
Copyright © 2021 Jooyeon Lee Released under the MIT license.
