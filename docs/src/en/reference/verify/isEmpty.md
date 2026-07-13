# isEmpty <Lang dart js python />

Returns true if the passed data is empty or has a length of 0.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any' }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

```dart [Dart]
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

```python [Python]
isEmpty([])  # Returns True
isEmpty('')  # Returns True
isEmpty('abc')  # Returns False
```

:::
