# numberFormat <Lang dart js python />

Returns the given number formatted for easy reading, including commas.

## Parameters

<ParamsTable :rows="[
	{ name: 'number', type: { js: 'number', python: 'int | float | str' }, required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
numberFormat(1234567); // Returns 1,234,567
```

:::

::: lang dart

```dart
numberFormat(1234567); // Returns 1,234,567
```

:::

::: lang python

```python
numberFormat(1234567)  # Returns 1,234,567
```

:::
