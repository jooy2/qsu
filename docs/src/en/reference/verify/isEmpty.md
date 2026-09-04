# isEmpty <Lang dart js python />

Returns true if the passed data is empty or has a length of 0.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

:::

::: lang dart

```dart
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

:::

::: lang python

```python
isEmpty([])  # Returns True
isEmpty('')  # Returns True
isEmpty('abc')  # Returns False
```

:::
