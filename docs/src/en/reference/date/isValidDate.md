# isValidDate <Lang js dart python />

Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.

Supported years are `1600`-`9999`, plus two-digit years `16`-`99`. Any other year returns `false`. Note that an input that is not in `YYYY-MM-DD` format throws rather than returning `false`.

The date can be checked only from `1600-01-01` to `9999-12-31` and all dates before `1600` are returned as `false`.

## Parameters

<ParamsTable :rows="[
	{ name: 'date', type: 'string', required: true }
]" />

## Returns

> boolean

## Examples

::: lang js

```javascript
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

:::

::: lang dart

```dart
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

:::

::: lang python

```python
isValidDate('2021-01-01')  # Returns True
isValidDate('2021-02-30')  # Returns False
```

:::
