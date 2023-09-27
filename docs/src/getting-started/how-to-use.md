---
title: How to Use
order: 2
---

# How to Use

## Using named import (Multiple utilities in a single require) - Recommend

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

## Using whole class (multiple utilities simultaneously with one object)

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```
