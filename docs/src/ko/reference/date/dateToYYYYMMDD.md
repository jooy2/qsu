# dateToYYYYMMDD
Date 객체의 날짜 데이터를 `YYYY-MM-DD` 형식으로 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'date', type: 'Date', required: true },
	{ name: 'separator', type: 'string', default: `'-'` }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

:::

::: lang dart

```dart
dateToYYYYMMDD(DateTime(2023, 12, 31)); // Returns '2023-12-31'
```

:::

::: lang python

```python
from datetime import datetime

dateToYYYYMMDD(datetime(2023, 12, 31))  # Returns '2023-12-31'
```

:::
