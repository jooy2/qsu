# isEqual <Lang dart js />

첫 번째 인수의 값을 왼쪽 피연산자로, 그 다음에 주어진 인수의 값을 오른쪽 피연산자로 비교하고, 값이 모두 같으면 `true`를 반환합니다.

`isEqual`은 데이터 유형이 일치하지 않더라도 `true`를 반환하지만, `isEqualStrict`는 모든 인수의 데이터 유형이 일치할 때만 `true`를 반환합니다.

## Parameters

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

In Dart, rest parameters are not supported in `rightOperand`.

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
const val1 = 'Left';
const val2 = 1;

isEqual('Left', 'Left', val1); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1, 1, 1); // Returns true
```

```dart [Dart]
final String val1 = 'Left';
final int val2 = 1;

isEqual('Left', 'Left'); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1); // Returns true
```

:::
