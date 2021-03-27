# 🧰 QSU
Quick and Simple Utility for JavaScript (NodeJS)

A collection of complex or useful features that are often used in JavaScript.

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

## qsu.string
Utility to help process string type data.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .removeSpecialChar | string **{String}** | Returns after removing all special characters, including spaces. | `removeSpecialChar('Hello, World!') // 'HelloWorld'` |
| .removeNewLine | string **{String}** | Removes \n, \r characters or replaces them with specified characters. | `removeNewLine('ab\ncd') // 'abcd'`<br/>`removeNewLine('ab\r\ncd', '-') // 'ab-cd'` |
| .capitalizeFirst | string **{String}** | Converts the first letter of the entire string to uppercase and returns. | `capitalizeFirst('abcd') // 'Abcd'` |

## qsu.math
Utility for arithmetic on numbers.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .rand | <li>min **{Number&#124;null}**</li><li>max **{Number&#124;null}**</li> | Returns a random number (0 to max or between min and max). | `rand() // 0-1`<br/>`rand(10) // 0~10`<br/>`rand(10, 20) // 10~20` |

## qsu.verify
Utility for data inspection.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .empty | data **{Any}** | Returns true if the passed data is empty or has a length of 0. | `empty([]) // true`<br/>`empty('') // true`<br/>`empty('abc') // false` |
| .isUrl | <li>url **{String}**</li><li>withProtocol **{Boolean&#124;null}**</li><li>strict **{Boolean&#124;null}**</li> | Returns true if the given data is in the correct URL format. If withProtocol is true, it is automatically appended to the URL when the protocol does not exist. If strict is true, URLs without commas (.) return false. | `isUrl('google.com') // false`<br/>`isUrl('google.com', true) // true`<br/>`isUrl('https://google.com') // true` |
| .contains | <li>string **{String}**</li><li>searchData **{Array&#124;String}** | Returns true if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". | `contains('abc', 'a') // true`<br/>`contains('abc', 'd') // false`<br/>`contains('abc', ['a', 'd']) // true` |

## qsu.format
Utility that converts to Human-Readable String format.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .number | val **{String&#124;Number}** | Return in number format including comma symbol. | `number(1234567) // 1,234,567` |

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
| .takes | function **{() => Function}** | Aggregate the execution time (in milliseconds) of the function passed as an argument. For a function to be passed explicitly, use the function without parentheses or the Arrow function or function() {...} as arguments. If the second argument is true, the decimal point is truncated. | `takes(testFunction) // 0.321...`<br/>`takes(() => testFUnction(args1, args2)) // 0.234...`<br/>`takes(() => testFunction, true) // 3` |

# Contribute
You can report issues on Github Issue. You can also request a pull to fix bugs and add frequently used features.

# License
Copyright © 2021 Jooyeon Lee Released under the MIT license.
