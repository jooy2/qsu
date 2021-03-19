# 🧰 QSU
Quick and Simple Utility for JavaScript (NodeJS)

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
    console.log(_.date.today('YYYY-MM-DD')); // '20xx-xx-xx'
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
    return _.today('YYYY-MM-DD'); // Return 20xx-xx-xx
}
```
OR
```javascript
const { today } = require('qsu/date'); // or require('qsu').date 

function main () {
    return today('YYYY-MM-DD'); // Return 20xx-xx-xx
}
```

# API Reference
```javascript
qsu.{{Util}}.{{Method}}({{Params1}}, {{Params2}})
```

## qsu.format()
Utility that converts to Human-Readable String format.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .number | <li>val **{String&#124;Number}** |  | `number(1234567) // 1,234,567` |

## qsu.date()
Utility to simplify date format printing or calculation.

| Method | Params | Description | Example |
| --- | --- | --- | --- |
| .dayDiff | <li>date1 **{String&#124;Date}**</li><li>date2 **{String&#124;Date&#124;null}**</li> |  | `daydiff('2021-01-01', '2021-01-02') // 2` |
| .today | <li>format **{'yyyy-mm-dd'&#124;null}**</li> |  | `today('YYYY-MM-DD') // 2020-01-01` |

# License
Copyright © 2021 Jooyeon Lee Released under the MIT license.
