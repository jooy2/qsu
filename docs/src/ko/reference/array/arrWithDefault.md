# arrWithDefault <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

특정 길이의 기본값으로 배열을 초기화합니다.

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
