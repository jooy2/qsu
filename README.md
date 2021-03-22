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
| .shuffle | <li>array **{Array}**</li> | Shuffle the order of the given array and return | `shuffle([1, 2, 3, 4]) // [4, 2, 3, 1]...` |
| .setWithDefault | <li>defaultValue **{Any}**</li><li>arrayLength **{Number&#124;null}**</li> | Initialize an array with a default value of a specific length | `setWithDefault('abc', 4) // ['abc', 'abc', 'abc', 'abc']`<br/>`setWithDefault(null, 3) // [null, null, null]` |

## qsu.math
Utility for arithmetic on numbers.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .rand | <li>min **{Number&#124;null}**</li><li>max **{Number&#124;null}**</li> | Returns a random number (0 to max or between min and max). | `rand() // 0-1`<br/>`rand(10) // 0~10`<br/>`rand(10, 20) // 10~20` |

## qsu.format
Utility that converts to Human-Readable String format.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .number | <li>val **{String&#124;Number}**</li> | Return in number format including comma symbol. | `number(1234567) // 1,234,567` |

## qsu.date
Utility to simplify date format printing or calculation.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .dayDiff | <li>date1 **{String&#124;Date}**</li><li>date2 **{String&#124;Date&#124;null}**</li> | Calculates the difference between two given dates and returns the number of days. | `daydiff('2021-01-01', '2021-01-03') // 2` |
| .today | <li>format **{'yyyy-mm-dd'&#124;null}**</li> | Returns today's date. | `today('YYYY-MM-DD') // 2021-01-01` |
| .isRealDate | <li>dateString (yyyy-mm-dd) **{String}**</li> | Checks if a given date actually exists. Check only in yyyy-mm-dd format. | `isRealDate('2021-01-01') // true`<br/>`isRealDate('2021-02-30') // false` |

## qsu.misc
Various utilities that help with convenience codes or complex operations.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .sleep | <li>Milliseconds **{Number}**</li> | Sleep function using Promise. | `await sleep(1000) // 1s`<br/>`sleep(5000).then(() => { ... })` |

# Contribute
You can report issues on Github Issue. You can also request a pull to fix bugs and add frequently used features.

# License
Copyright © 2021 Jooyeon Lee Released under the MIT license.
