# dateToYYYYMMDD <Lang js dart python />

Returns the date data of a Date object in the format `YYYY-MM-DD`.

## Parameters

<ParamsTable :rows="[
	{ name: 'date', type: 'Date', required: true },
	{ name: 'separator', type: 'string', default: `'-'` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

```dart [Dart]
dateToYYYYMMDD(DateTime(2023, 12, 31)); // Returns '2023-12-31'
```

```python [Python]
from datetime import datetime

dateToYYYYMMDD(datetime(2023, 12, 31))  # Returns '2023-12-31'
```

:::
