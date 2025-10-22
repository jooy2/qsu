# arrWithDefault <Lang dart js />

Initialize an array with a default value of a specific length.

## Parameters

- `defaultValue::any`
- `length::number || 0`

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

:::
