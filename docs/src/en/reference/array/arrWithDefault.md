# arrWithDefault <Lang dart js python />

Initialize an array with a default value of a specific length.

## Parameters

<ParamsTable :rows="[
	{ name: 'defaultValue', type: 'any', required: true },
	{ name: 'length', type: 'number', default: '0' }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(null, 3); // Returns [null, null, null]
```

```dart [Dart]
arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(null, 3); // Returns [null, null, null]
```

```python [Python]
arrWithDefault('abc', 4)  # Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(None, 3)  # Returns [None, None, None]
```

:::
