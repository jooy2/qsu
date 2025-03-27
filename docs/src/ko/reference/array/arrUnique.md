# arrUnique <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

배열과 2차원 배열 데이터에서 중복 값을 제거합니다. 2차원 배열의 경우, JSON 유형 데이터 중복은 제거되지 않습니다.

## Parameters

- `array::any[]`

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

```dart [Dart]
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

:::
