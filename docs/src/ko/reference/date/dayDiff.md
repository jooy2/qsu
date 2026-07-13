# dayDiff <Lang js python />

주어진 두 날짜의 차이를 계산하고 일 수를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'date1', type: 'Date', required: true },
	{ name: 'date2', type: 'Date' }
]" />

## Returns

> number'

## Examples

::: code-group

```javascript [JavaScript]
dayDiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

```dart [Dart]
dayDiff(DateTime(2021, 1, 1), DateTime(2021, 1, 3)); // Returns 2
```

```python [Python]
from datetime import datetime

dayDiff(datetime(2021, 1, 1), datetime(2021, 1, 3))  # Returns 2
```

:::
