# truncate <Lang dart js />

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

## Parameters

- `str::string`
- `length::number`
- `ellipsis::string || ''` <DartNamed />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, '...'); // Returns 'he...'
```

```dart [Dart]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

:::
