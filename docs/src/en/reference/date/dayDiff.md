# dayDiff
Calculates the difference between two given dates and returns the number of days.

## Parameters

<ParamsTable :rows="[
	{ name: 'date1', type: 'Date', required: true },
	{ name: 'date2', type: 'Date' }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
dayDiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

:::

::: lang dart

```dart
dayDiff(DateTime(2021, 1, 1), DateTime(2021, 1, 3)); // Returns 2
```

:::

::: lang python

```python
from datetime import datetime

dayDiff(datetime(2021, 1, 1), datetime(2021, 1, 3))  # Returns 2
```

:::
