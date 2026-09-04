# createDateListFromRange
Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.

## Parameters

<ParamsTable :rows="[
	{ name: 'startDate', type: 'Date', required: true },
	{ name: 'endDate', type: 'Date', required: true }
]" />

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
createDateListFromRange(new Date('2023-01-01T01:00:00Z'), new Date('2023-01-05T01:00:00Z'));

/*
	 [
		 '2023-01-01',
		 '2023-01-02',
		 '2023-01-03',
		 '2023-01-04',
		 '2023-01-05'
	 ]
 */
```

:::

::: lang dart

```dart
createDateListFromRange(DateTime.utc(2023, 1, 1, 1, 0, 0), DateTime.utc(2023, 1, 5, 1, 0, 0));

/*
	 [
		 '2023-01-01',
		 '2023-01-02',
		 '2023-01-03',
		 '2023-01-04',
		 '2023-01-05'
	 ]
 */
```

:::

::: lang python

```python
from datetime import datetime

createDateListFromRange(datetime(2023, 1, 1, 1, 0, 0), datetime(2023, 1, 5, 1, 0, 0))

#  [
#      '2023-01-01',
#      '2023-01-02',
#      '2023-01-03',
#      '2023-01-04',
#      '2023-01-05'
#  ]
```

:::
