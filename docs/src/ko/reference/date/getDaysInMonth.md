# getDaysInMonth

주어진 해의 한 달이 며칠인지 28에서 31 사이의 값으로 반환합니다. 윤년의 2월은 29일이며, 윤년 여부는 [isLeapYear](./isLeapYear)와 같은 방식으로 정합니다.

`month`는 날짜를 적을 때처럼 1월의 `1`부터 12월의 `12`까지 셉니다. 이 범위를 벗어난 월을 넘기면 <Val js="RangeError" dart="RangeError" python="ValueError" />를 던집니다.

::: lang js

`Date.prototype.getMonth`가 돌려주는 월과는 다릅니다. 그 값은 `0`부터 세므로 `1`을 더해서 넘기세요.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'year', type: 'number', required: true },
	{ name: 'month', type: 'number', required: true, desc: '`1`(1월)부터 `12`(12월)까지입니다.' }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
getDaysInMonth(2024, 2); // Returns 29
getDaysInMonth(2023, 2); // Returns 28
getDaysInMonth(2024, 4); // Returns 30
getDaysInMonth(2024, 12); // Returns 31
```

:::

::: lang dart

```dart
getDaysInMonth(2024, 2); // Returns 29
getDaysInMonth(2023, 2); // Returns 28
getDaysInMonth(2024, 4); // Returns 30
getDaysInMonth(2024, 12); // Returns 31
```

:::

::: lang python

```python
getDaysInMonth(2024, 2)  # Returns 29
getDaysInMonth(2023, 2)  # Returns 28
getDaysInMonth(2024, 4)  # Returns 30
getDaysInMonth(2024, 12)  # Returns 31
```

:::
