# strCount <Lang dart js python />

Returns the number of times the second String argument is contained in the first String argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'search', type: 'string', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
strCount('abcabc', 'a'); // Returns 2
```

:::

::: lang dart

```dart
strCount('abcabc', 'a'); // Returns 2
```

:::

::: lang python

```python
strCount('abcabc', 'a')  # Returns 2
```

:::
