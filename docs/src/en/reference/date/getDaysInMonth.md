# getDaysInMonth

Returns the number of days in a month of a given year, from 28 to 31. February has 29 days in a leap year, decided the same way as [isLeapYear](./isLeapYear).

`month` counts from `1` for January to `12` for December, the way a date is written. A month outside that range throws a <Val js="RangeError" dart="RangeError" python="ValueError" />.

::: lang js

This is not the month `Date.prototype.getMonth` returns, which counts from `0`. Add `1` to that one before passing it.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'year', type: 'number', required: true },
	{ name: 'month', type: 'number', required: true, desc: 'From `1` (January) to `12` (December).' }
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
