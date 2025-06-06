# truncate <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

## Parameters

- `str::string`
- `length::number`
- `ellipsis::string || ''` <span class="named">Dart:Named</span>

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
